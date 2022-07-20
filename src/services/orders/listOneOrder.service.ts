import { AppError } from "../../errors/appError";
import { listOrdersRepository } from "../../repositories/orders";

const listOneOrderService = async (orderId: string) => {
  const orders = await listOrdersRepository();
  const orderToShow = orders.find((order) => order.id === orderId);

  if (!orderToShow) {
    throw new AppError("Order not found!", 404);
  }

  return orderToShow;
};

export default listOneOrderService;
