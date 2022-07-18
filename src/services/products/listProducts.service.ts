import { listProductRepository } from "../../repositories/products";

const listProductsService = async () => {
  const products = await listProductRepository();

  return products;
};
export default listProductsService;
