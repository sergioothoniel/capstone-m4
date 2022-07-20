import { Request, Response } from 'express'
import deleteCategoryService from '../../services/categories/deleteCategory.service'

const deleteCategoryController = async (req: Request, res: Response) => {


  const { id } = req.params

  const deleteCategory = await deleteCategoryService(id)

  return res.status(200).json({
    message: "Category Deleted"
  })

}

export default deleteCategoryController