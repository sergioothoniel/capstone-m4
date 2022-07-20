import appDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";

const updateCategoryService = async (id: string, newName: string) => {

  const categoryRepository = appDataSource.getRepository(Category)
  const category = await categoryRepository.find()


  const findCategory = category.find((category) => category.id === id)

  const findSameCategory = category.find((category) => category.name === newName)

  if (findSameCategory) {
    throw new AppError("Category Name already exists", 404)
  }

  if (!findCategory) {
    throw new AppError("Category not found", 404)
  }

  const categoryUpdated = await categoryRepository.update(findCategory.id!, { name: newName })

  return categoryUpdated

}
export default updateCategoryService