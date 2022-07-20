import appDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { listCategoriesRepository, updateCategoriesRepository } from "../../repositories/categories";

const updateCategoryService = async (id: string, newName: string) => {

  const category = await listCategoriesRepository()

  const findCategory = category.find((category) => category.id === id)

  const findSameCategory = category.find((category) => category.name === newName)

  if (findSameCategory) {
    throw new AppError("Category Name already exists", 404)
  }

  if (!findCategory) {
    throw new AppError("Category not found", 404)
  }

  const categoryUpdated = await updateCategoriesRepository(id, newName)

  return categoryUpdated

}
export default updateCategoryService