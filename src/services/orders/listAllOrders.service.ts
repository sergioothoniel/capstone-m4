import { listOrdersRepository } from "../../repositories/orders";

const listAllOrdersService = async () => {
  const orders = await listOrdersRepository();
  return orders;
};

export default listAllOrdersService;
