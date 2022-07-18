import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import listCategoriesService from "../../services/categories/listCategories.service"
const listCategoriesController = async (req: Request, res: Response) => {

  try {

    const categoriesList = await listCategoriesService()

    return res.status(200).json(categoriesList)

  } catch (err) {

    if (err instanceof AppError) {

      handleError(err, res)
    }


  }

}
export default listCategoriesController