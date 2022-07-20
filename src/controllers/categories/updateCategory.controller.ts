import { Request, Response } from 'express'
import updateCategoryService from '../../services/categories/updateCategory.service'

const updateCategoryController = async (req: Request, res: Response) => {


  const { id } = req.params
  const { newName } = req.body

  const updateCategory = await updateCategoryService(id, newName)
  return res.status(200).json({
    message: "Category Updated",
    category: updateCategory
  })

}
export default updateCategoryController
