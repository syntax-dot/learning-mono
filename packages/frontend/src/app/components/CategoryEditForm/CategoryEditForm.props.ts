import { CategoryDto } from '@learning-mono/shared'

export interface CategoryEditFormProps {
  category: CategoryDto
}

export interface CategoryEditFormEmits {
  (event: 'changed'): void
}
