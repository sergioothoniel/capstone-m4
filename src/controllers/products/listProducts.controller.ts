import { Request, Response } from "express";
import listProductsService from "../../services/products/listProducts.service";

const listProductsController = async (request: Request, response: Response) => {
  const products = await listProductsService();
  return response.status(200).json(products);
};
export default listProductsController;
