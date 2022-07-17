import appDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";

const deleteCategoryService = async (id: string) => {


  const categoryRepository = appDataSource.getRepository(Category)

  const category = await categoryRepository.find()

  const findCategoryById = category.find((category) => category.id === id)

  if (!findCategoryById) {
    throw new AppError("Category ID not found!", 404)
  }

  await categoryRepository.delete(findCategoryById.id!)


  return true

}
export default deleteCategoryService