import appDataSource from "../../data-source";
import { Order } from "../../entities/order.entity";

export const ordersRepository = appDataSource.getRepository(Order);

export const listOrdersRepository = async () => {
  const orders = await ordersRepository.find();

  const ordersListFormated = orders.map(order =>{
    const product = order.product.id
    const user = order.user.id

    const orderFormated = {...order, product, user}

    return orderFormated

  })
  return ordersListFormated;
};

export const createOrdersRepository = (
  newOrder: any
) => {
  const order = ordersRepository.create(newOrder);
  return order;
};

export const saveOrdersRepository = async (
  newOrder: any
) => {
  const order = await ordersRepository.save(newOrder);

  const product = order.product.id
  const user = order.user.id

  const orderFormated = {...order, product, user}

  return orderFormated;
};

export const deleteOrderRepository = async (id: string) => {
  const orders = await listOrdersRepository();

  const orderToDelete = orders.find((order) => order.id === id);

  await ordersRepository.delete(orderToDelete!.id);
};

export const updateOrdersRepository = async (id: string) => {
  await ordersRepository.update({ id: id }, { active: false });

  const orders = await listOrdersRepository();
  const orderUpdated = orders.find((order) => order.id === id);

  return orderUpdated;
};
