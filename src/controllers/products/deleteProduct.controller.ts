import { Request, Response } from "express";
import deleteProductService from "../../services/products/deleteProduct.service";

const deleteProductController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const deleteProduct = await deleteProductService(id);
  return response.status(200).json({ message: "Product Deleted" });
};
export default deleteProductController;
