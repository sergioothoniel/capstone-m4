import { Request, Response } from "express";
import listProductsFormatedService from "../../services/products/listProductsFormated.service";

const listProductsFormatedController = async (
  request: Request,
  response: Response
) => {
  const { page } = request.query;

  const productsList = await listProductsFormatedService(
    page ? Number(page) : 1
  );

  return response.status(200).json(productsList);
};
export default listProductsFormatedController;
