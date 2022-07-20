import { Request, Response } from "express";
import createProductService from "../../services/products/createProducts.service";

const createProductController = async (
  request: Request,
  response: Response
) => {
  const userId = request.userData.id;

  const product = request.body;

  const newProduct = await createProductService(product, userId);

  return response
    .status(201)
    .json({ message: "Product created", newProduct: newProduct });
};

export default createProductController;
