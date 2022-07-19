import { AppError } from "../../errors/appError";
import { IOrderUpdate } from "../../interfaces/orders";

import {
  listOrdersRepository,
  updateOrdersRepository,
} from "../../repositories/orders";
import { listProductRepository } from "../../repositories/products";

const updateOrderService = async (orderId: string, data: IOrderUpdate) => {
  const orders = await listOrdersRepository();
  const orderToUpdate = orders.find((order) => order.id === orderId);

  if (!orderToUpdate) {
    throw new AppError("Order not found", 404);
  }

  let newData: any = { ...data };

  if (data.product) {
    const products = await listProductRepository();
    const productSearched = products.find((value) => value.id === data.product);

    if (!productSearched) {
      throw new AppError("Product is incorrect");
    }

    newData.product = productSearched;
  }

  const order = await updateOrdersRepository(orderId);

  return order;
};

export default updateOrderService;
