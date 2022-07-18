import { Request, Response } from "express";
import createProductService from "../../services/products/createProducts.service";

const createProductController = async (
  request: Request,
  response: Response
) => {
  const product = request.body;

  const newProduct = await createProductService(product);

  return response.status(200).json(newProduct);
};

export default createProductController;
