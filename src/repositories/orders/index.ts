import appDataSource from "../../data-source"
import { Order } from "../../entities/order.entity"
import {IOrderRequest, IOrderResponse} from "../../interfaces/orders"

export const ordersRepository = appDataSource.getRepository(Order)

export const listOrdersRepository = async (): Promise<IOrderResponse[]> =>{
    const orders = await ordersRepository.find()
    return orders
}


export const createOrdersRepository = (newOrder: IOrderRequest): IOrderResponse =>{
    const order = ordersRepository.create(newOrder)
    return order
}

export const saveOrdersRepository = async (newOrder: IOrderRequest): Promise<IOrderResponse> =>{
    const order = await ordersRepository.save(newOrder)
    return order
}

export const deleteOrderRepository = async (id: string) =>{

    const orders = await listOrdersRepository()

    const orderToDelete = orders.find(order => order.id === id)

    await ordersRepository.delete(orderToDelete!.id)
}

export const updateOrdersRepository = async (id: string)=>{

    await ordersRepository.update({id: id}, {active: false})

    const orders = await listOrdersRepository()
    const orderUpdated = orders.find(order => order.id === id)

    return orderUpdated
}