import { AppError } from "../../errors/appError";
import {
  createOrdersRepository,
  saveOrdersRepository,
} from "../../repositories/orders";
import { listUsersRepository } from "../../repositories/users";
import { listProductRepository } from "../../repositories/products";

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
  const user = users.find((user) => user.id === user_id);

  const products = await listProductRepository();
  const product = products.find((product) => product.id === product_id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const orderCreated = await saveOrdersRepository({
    id: order.id,
    product: product,
    user: user,
    quantity: order.quantity,
    type: order.type,
    active: order.active,
    created_at: order.created_at,
    updated_at: order.updated_at,
  });

  return orderCreated;
};

export default createOrderService;
