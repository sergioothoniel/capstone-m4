import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import listCategoryByIdService from '../../services/categories/listCategoryById.service'
const listCategoryByIdController = async (req: Request, res: Response) => {

  try {

    const { id } = req.params

    const findCategoryById = await listCategoryByIdService(id)

    return res.status(200).json(findCategoryById)


  } catch (err) {

    if (err instanceof AppError) {
      handleError(err, res)
    }

  }

}
export default listCategoryByIdController