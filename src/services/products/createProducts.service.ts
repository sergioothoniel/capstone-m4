import appDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import { AppError } from "../../errors/appError";
import { IProductsRequest, IProductsResponse } from "../../interfaces/products";
import { v4 as uuid } from "uuid";
import {
  productsRepository,
  createUProductsRepository,
  saveProductRepository,
  listProductRepository,
} from "../../repositories/products";
import { Category } from "../../entities/category.entity";
import { User } from "../../entities/user.entity";

const createProductService = async (data: IProductsRequest) => {
  const { name, description, category_id, user_id } = data;

  const products = await listProductRepository();

  const productAlreadyExists = products.find(
    (product) => product.name === name
  );

  if (productAlreadyExists) {
    throw new AppError("product already registered", 404);
  }

  const categoryRepository = appDataSource.getRepository(Category);

  const categories = await categoryRepository.find();
  const findCategory = categories.find((category) => {
    category.id === category_id;
  });

  // if (!findCategory) {
  //   throw new AppError("category not found", 404);
  // }
  const userRepository = appDataSource.getRepository(User);

  const users = await userRepository.find();
  const userId = users.find((user) => {
    user.id === user_id;
  });
  // if (!userId) {
  //   throw new AppError("user not found", 404);
  // }

  const newProduct = {
    id: uuid(),
    name: name,
    description: description,
    category: findCategory,
    user: userId,
  };
  const productResponse = createUProductsRepository(newProduct);
  await saveProductRepository(productResponse);

  return productResponse;
};
export default createProductService;
