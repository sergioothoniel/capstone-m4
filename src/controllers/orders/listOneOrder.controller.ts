import { Request, Response } from "express";
import listOneOrderService from "../../services/orders/listOneOrder.service";

const listOneOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await listOneOrderService(id);

  return res.status(200).json(order);
};

export default listOneOrderController;
