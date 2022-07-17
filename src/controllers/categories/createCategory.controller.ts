import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import createCategoryService from '../../services/categories/createCategoryService'

const createCategoryController = async (req: Request, res: Response) => {

  try {
    const { name } = req.body

    const createCategory = await createCategoryService(name)

    return res.status(201).json(createCategory)

  } catch (err) {

    if (err instanceof AppError) {

      handleError(err, res)

    }
  }

}
export default createCategoryController