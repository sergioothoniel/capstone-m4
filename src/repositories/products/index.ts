import appDataSource from "../../data-source";
import { Product } from "../../entities/product.entity";
import {
  IProductFormated,
  IProductsRequest,
  IProductsResponse,
  IProductUpdate,
} from "../../interfaces/products";

export const productsRepository = appDataSource.getRepository(Product);

export const listProductRepository = async () => {
  const products = await productsRepository.find();
  const usersFormated = products.map((value):IProductFormated => {

    const user: string = value.user.id;

    const newProduct = { ...value, user: user };

    return newProduct;
  });

  return usersFormated;
};

export const createUProductsRepository = (newProduct: any) => {
  const product = productsRepository.create(newProduct);
  return product;
};

export const saveProductRepository = async (newProduct: any) => {
  const product = await productsRepository.save(newProduct);

  const poductsList = await listProductRepository()
  const productSaved = poductsList.find(value => value.id === product.id)

  return productSaved;
};

export const deleteProductRepository = async (id: string) => {
  const products = await listProductRepository();

  const productToDelete = products.find((product) => product.id === id);

  await productsRepository.delete(productToDelete!.id);
};

export const updateProductRepository = async (
  id: string,
  data: IProductUpdate
) => {
  await productsRepository.update({ id: id }, data);

  const products = await listProductRepository();
  const productUpdated = products.find((product) => product.id === id);

  return productUpdated;
};
