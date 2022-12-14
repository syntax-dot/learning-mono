import { CreateQuestionInput, QuestionDto, UpdateQuestionInput } from '@learning-mono/shared'
import { getAnswersByQuestionId, removeAnswer, updateAnswer } from '../answer/answer.service'
import { Deps, inject } from '../app/di'

export async function getQuestionById(id: number) {
  return await inject(Deps.PRISMA).question.findUnique({
    where: {
      id,
    },
    include: {
      theme: true,
    },
  })
}

export async function getAllQuestions() {
  return inject(Deps.PRISMA).question.findMany()
}

// export async function createQuestion(createQuestionInput: CreateQuestionInput) {
//   const prisma = inject(Deps.PRISMA)
//
//   if (questionInput.id) {
//     const question = await prisma.question.findUnique({
//       where: {
//         id: questionInput.id,
//       },
//       include: {
//         answers: true,
//       },
//     })
//
//     if (question) {
//       await prisma.question.update({
//         data: {
//           title: questionInput.title,
//         },
//         where: {
//           id: questionInput.id,
//         },
//       })
//
//       const answerIdsForDelete = findAnswerIdsForDelete(questionInput.answers, question.answers)
//
//       const deletePromise = prisma.answer.deleteMany({
//         where: {
//           id: {
//             in: answerIdsForDelete,
//           },
//         },
//       })
//
//       const createPromise = prisma.answer.createMany({
//         data: findAnswersForCreate(questionInput.answers, question.answers).map((v) => ({
//           ...v,
//           questionId: question.id,
//         })),
//       })
//
//       const answersForUpdate = findAnswersForUpdate(questionInput.answers, question.answers)
//       const updatePromises = answersForUpdate.map(
//         async answer =>
//           prisma.answer.update({
//             data: answer,
//             where: {
//               id: answer.id,
//             },
//           }),
//       )
//       await Promise.all([...updatePromises, createPromise, deletePromise])
//     }
//   }
//
//   return prisma.question.create({
//     data: {
//       title: questionInput.title,
//       themeId: questionInput.themeId,
//       answers: {
//         createMany: {
//           data: questionInput.answers,
//         },
//       },
//     },
//   })
// }

export async function createQuestion(createQuestionInput: CreateQuestionInput) {
  return inject(Deps.PRISMA).question.create({
    data: {
      title: createQuestionInput.title,
      themeId: createQuestionInput.themeId,
    },
  })
}

export async function updateQuestion(updateQuestionInput: UpdateQuestionInput) {
  if (updateQuestionInput.answers)
    await Promise.all(updateQuestionInput.answers.map(updateAnswer))

  return inject(Deps.PRISMA).question.update({
    data: {
      title: updateQuestionInput.title,
    },
    where: {
      id: updateQuestionInput.id,
    },
  })
}

export async function removeQuestion(questionId: number | number[]) {
  await destroyQuestion(questionId)

  return inject(Deps.PRISMA).question.deleteMany({
    where: {
      id: {
        in: questionId,
      },
    },
  })
}

// export async function removeQuestionsByThemeId(themeId: number | number[]) {
//   return inject(Deps.PRISMA).question.deleteMany({
//     where: {
//       themeId: {
//         in: themeId,
//       },
//     },
//   })
// }

export async function destroyQuestion(questionId: number | number[]) {
  const answers = await getAnswersByQuestionId(questionId)
  const answerIds = answers.map(v => v.id)

  await removeAnswer(answerIds)
}

export async function getQuestionsByThemeId(themeId: number | number[]): Promise<QuestionDto[]> {
  return inject(Deps.PRISMA).question.findMany({
    where: {
      themeId: {
        in: themeId,
      },
    },
    include: {
      answers: true,
    },
  })
}
