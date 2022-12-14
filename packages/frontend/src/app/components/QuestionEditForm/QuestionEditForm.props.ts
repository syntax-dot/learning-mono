import { QuestionDto } from '@learning-mono/shared'

export interface QuestionEditFormProps {
  question: QuestionDto
}

export interface QuestionEditFormEmits {
  (event: 'changed'): void
}
