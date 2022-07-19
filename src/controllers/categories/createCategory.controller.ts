import { Request, Response } from 'express'
import createCategoryService from '../../services/categories/createCategory.service'

const createCategoryController = async (req: Request, res: Response) => {


  const { name } = req.body

  const createCategory = await createCategoryService(name)

  return res.status(201).json(createCategory)


}
export default createCategoryController