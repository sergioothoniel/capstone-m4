import { Request, Response } from "express";
import updateOrderService from "../../services/orders/updateOrder.service";

const updateOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const orderUpdated = await updateOrderService(id, data);

  return res.status(200).json({message: "Order disabled"});
};

export default updateOrderController;
