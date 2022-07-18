import appDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";


const listCategoryByIdService = async (id: string) => {

  const categoryRepository = appDataSource.getRepository(Category)

  const category = await categoryRepository.find()

  const findCategory = category.find((category) => category.id === id)

  if (!findCategory) {

    throw new AppError("ID not found", 404)
  }

  return findCategory

}
export default listCategoryByIdService
