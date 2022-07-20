import appDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { IProductsRequest } from "../../interfaces/products";
import { categoriesRepository } from "../../repositories/categories";

import {
  updateProductRepository,
  productsRepository,
} from "../../repositories/products";

const updateProductsService = async (id: string, data: IProductsRequest) => {
  const { name, description, category_id, user_id } = data;
  const product = await productsRepository.findOneBy({ id: id });

  const categoryRepository = categoriesRepository;
  const categories = await categoryRepository.find();
  const findCategory = categories.find((category) => {
    return category.id === category_id;
  });

  if (!product) {
    throw new AppError("product not found", 404);
  }

  const updatedProduct = {
    ...product,
    name: name ? name : product.name,
    description: description ? description : product.description,
    category: findCategory ? findCategory : product.category,
    user: user_id ? user_id : product.user,
  };

  const productResponse = updateProductRepository(id, updatedProduct);

  return productResponse;
};
export default updateProductsService;
