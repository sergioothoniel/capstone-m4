import appDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { deleteCategoriesRepository, listCategoriesRepository } from "../../repositories/categories";
import { listProductRepository, productsRepository } from "../../repositories/products";

const deleteCategoryService = async (id: string) => {
  
  const category = await listCategoriesRepository()

  const findCategoryById = category.find((category) => category.id === id)

  if (!findCategoryById) {
    throw new AppError("Category ID not found!", 404)
  }

  const products = await productsRepository.find()
  const productsByCategory = products.find(product => product.category.id === id)

  if(productsByCategory){
    throw new AppError("Category can't be removed cause it's beeing used on same products", 405)
  }

  await deleteCategoriesRepository(id)

  return true

}
export default deleteCategoryService