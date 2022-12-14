import { CreateCategoryInput, UpdateCategoryInput } from '@learning-mono/shared'
import { defineRoute } from '../validate/validate'
import { createCategory, getAllCategories, getCategoryById, removeCategory, updateCategory } from './category.service'

export const categoryRoute = defineRoute('category')

categoryRoute.getById(getCategoryById)

categoryRoute.create(CreateCategoryInput, createCategory)

categoryRoute.update(UpdateCategoryInput, updateCategory)

categoryRoute.remove(removeCategory)

categoryRoute.custom('get', '/categories', getAllCategories)

// export const categoryRoute = Router()

// categoryRoute.get('/categories/:id?', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   if (req.params.id) {
//     const category = await getCategoryById(parseInt(req.params.id))
//     res.json(category)
//   } else {
//     const categories = await getAllCategories()
//     res.json(categories)
//   }
// })
//
// categoryRoute.post('/categories', authGuard, async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, image } = req.body
//   const category = await createCategory(title, image)
//   res.json(category)
// })
//
// categoryRoute.put('/categories', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const { title, categoryId, image } = req.body
//   const updatedCategory = await updateCategory(title, categoryId, image)
//   res.json(updatedCategory)
// })
//
// categoryRoute.delete('/categories/:id', async (req, res) => {
//   // TODO VALIDATE REQ BODY
//   const categoryId = parseInt(req.params.id)
//   const removedCategory = await removeCategory(categoryId)
//   res.json(removedCategory)
// })
