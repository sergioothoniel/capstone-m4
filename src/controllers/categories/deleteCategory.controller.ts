import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import deleteCategoryService from '../../services/categories/deleteCategory.service'

const deleteCategoryController = async (req: Request, res: Response) => {

  try {

    const { id } = req.params

    const deleteCategory = await deleteCategoryService(id)

    return res.status(200).json(deleteCategory)

  } catch (err) {

    if (err instanceof AppError) {
      handleError(err, res)
    }

  }

}

export default deleteCategoryController