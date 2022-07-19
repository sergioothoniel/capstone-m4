import { Request, Response } from "express";
import listAllOrdersService from "../../services/orders/listAllOrders.service";

const listAllOrdersController = async (req: Request, res: Response) => {
  const orders = await listAllOrdersService();

  return res.status(200).json(orders);
};

export default listAllOrdersController;
