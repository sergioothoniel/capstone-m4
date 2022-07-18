import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import updateCategoryService from '../../services/categories/updateCategory.service'

const updateCategoryController = async (req: Request, res: Response) => {


  try {

    const { id } = req.params
    const { newName } = req.body

    const updateCategory = await updateCategoryService(id, newName)
    return res.status(201).json(updateCategory)

  } catch (err) {

    if (err instanceof AppError) {
      handleError(err, res)
    }

  }

}
export default updateCategoryController
