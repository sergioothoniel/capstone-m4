import { Request, Response } from "express";
import deleteOrderService from "../../services/orders/deleteOrder.service";

const deleteOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteOrderService(id);

  return res.status(200).json({ message: "Order deleted" });
};

export default deleteOrderController;
