import { AppError } from "../../errors/appError";
import { IProductsRequest, IProductsResponse } from "../../interfaces/products";
import {
  productsRepository,
  createUProductsRepository,
  saveProductRepository,
  listProductRepository,
} from "../../repositories/products";
import { listUsersRepository } from "../../repositories/users";
import { categoriesRepository } from "../../repositories/categories";

const createProductService = async (data: IProductsRequest, id: string) => {
  const { name, description, category_id } = data;

  const products = await listProductRepository();

  const productAlreadyExists = products.find(
    (product) => product.name === name
  );

  if (productAlreadyExists) {
    throw new AppError("Product already registered", 404);
  }

  const categoryRepository = categoriesRepository;

  const categories = await categoryRepository.find();
  const findCategory = categories.find((category) => {
    return category.id === category_id;
  });

  if (!findCategory) {
    throw new AppError("category not found", 404);
  }

  const users = await listUsersRepository();
  const userId = users.find((user) => {
    return user.id === id;
  });
  if (!userId) {
    throw new AppError("User not found", 404);
  }

  const newProduct = {
    name: name,
    description: description,
    category: findCategory,
    user: userId,
  };

  const productResponse = createUProductsRepository(newProduct);
  const productTrated = await saveProductRepository(productResponse);

  return productTrated;
};
export default createProductService;
