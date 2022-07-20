import { Request, Response } from "express";
import updateProductsService from "../../services/products/updateProducts.service";

const updateProductsController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const product = request.body;
  const updateProduct = await updateProductsService(id, product);

  return response
    .status(200)
    .json({ message: "Product updated", updateProduct });
};
export default updateProductsController;
