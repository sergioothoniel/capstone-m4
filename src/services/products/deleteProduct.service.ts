import { AppError } from "../../errors/appError";
import { productsRepository } from "../../repositories/products";

const deleteProductService = async (id: string) => {
  const product = await productsRepository.delete({ id: id });
  if (product.affected === 0) {
    throw new AppError("product not found", 404);
  }
  return product;
};
export default deleteProductService;
