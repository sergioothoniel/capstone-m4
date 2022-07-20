import { Request, Response } from "express";
import createOrderService from "../../services/orders/createOrder.service";

const createOrderController = async (req: Request, res: Response) => {
  const { product_id, quantity, type } = req.body;
  const { userData } = req;

  const user_id = userData.id;

  const newOrder = await createOrderService({
    user_id,
    type,
    product_id,
    quantity,
  });

  return res.status(201).json({
    message: "Order Registred",
    newOrder,
  });
};

export default createOrderController;
