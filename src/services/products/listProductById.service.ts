import { AppError } from "../../errors/appError";
import { productsRepository } from "../../repositories/products";

const listProductByIdService = async (id: string) => {
  const productId = await productsRepository.findOneBy({ id: id });
  if (!productId) {
    throw new AppError("Product not found", 404);
  }

  return productId;
};
export default listProductByIdService;
