import { AnswerDto, CreateAnswerInput, UpdateAnswerInput } from '@learning-mono/shared'
import { instance } from './axios'

export const answer = {
  async create(createAnswerInput: CreateAnswerInput): Promise<AnswerDto> {
    return await instance.post('/answer', createAnswerInput)
      .then(v => v.data)
  },

  async update(updateAnswerInput: UpdateAnswerInput): Promise<AnswerDto> {
    return await instance.put('/answer', updateAnswerInput)
      .then(v => v.data)
  },

  async remove(answerId: number): Promise<AnswerDto> {
    return await instance.delete(`/answer/${answerId}`)
      .then(v => v.data)
  },
}
