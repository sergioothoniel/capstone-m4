import { Request, Response } from "express";
import listProductByIdService from "../../services/products/listProductById.service";

const listProductsByIdController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const productId = await listProductByIdService(id);

  return response.status(200).json(productId);
};
export default listProductsByIdController;
