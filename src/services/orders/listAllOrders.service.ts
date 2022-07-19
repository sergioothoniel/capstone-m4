import { IOrderResponse } from "../../interfaces/orders";
import { listOrdersRepository } from "../../repositories/orders";

const listAllOrdersService = async (): Promise<IOrderResponse[]> => {
  const orders = await listOrdersRepository();
  return orders;
};

export default listAllOrdersService;
