import { instance } from '@app/api/axios'
import { Category } from '@app/types'

export interface CategoryInput {
  title: string
  image?: string
  categoryId?: number
}

export const category = {
  async getAll(): Promise<Category[]> {
    return instance.get('/categories')
      .then(v => v.data)
  },

  async getById(categoryId: string): Promise<Category> {
    return instance.get(`/categories/${categoryId}`)
      .then(v => v.data)
  },

  async create(categoryInput: CategoryInput): Promise<Category> {
    return instance.post('/categories', categoryInput)
      .then(v => v.data)
  },

  async update(categoryInput: CategoryInput): Promise<Category> {
    return instance.put('/categories', categoryInput)
      .then(v => v.data)
  },

  async remove(categoryId: number) {
    return instance.delete(`/categories/${categoryId}`)
  },
}
