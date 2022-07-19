import appDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";

const createCategoryService = async (name: string) => {

  const categoryRepository = appDataSource.getRepository(Category)
  const categories = await categoryRepository.find()

  const categoryAlreadyExists = categories.find((category) => category.name === name)

  if (categoryAlreadyExists) {
    throw new AppError('Category Already Exists', 404)
  }

  const newCategory = new Category()

  newCategory.name = name

  categoryRepository.create(newCategory)
  await categoryRepository.save(newCategory)

  return newCategory

}
export default createCategoryService