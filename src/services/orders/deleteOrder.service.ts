import { AppError } from "../../errors/appError";
import {
  deleteOrderRepository,
  listOrdersRepository,
} from "../../repositories/orders";

const deleteOrderService = async (orderId: string): Promise<void> => {
  const orders = await listOrdersRepository();

  const orderToDelete = orders.find((order) => order.id === orderId);

  if (!orderToDelete) {
    throw new AppError("Order not found", 404);
  }

  await deleteOrderRepository(orderId);
};

export default deleteOrderService;
