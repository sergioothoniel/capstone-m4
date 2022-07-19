import { AppError } from "../../errors/appError";
import {
  createOrdersRepository,
  saveOrdersRepository,
} from "../../repositories/orders";
import { listUsersRepository } from "../../repositories/users";

import { IOrderRequest } from "../../interfaces/orders";

const createOrderService = async ({
  user_id,
  type,
  product_id,
  quantity,
}: IOrderRequest) => {
  const order = createOrdersRepository({
    user_id,
    type,
    product_id,
    quantity,
  });

  const users = await listUsersRepository();

  const orderCreated = await saveOrdersRepository(order);

  return orderCreated;
};

export default createOrderService;
