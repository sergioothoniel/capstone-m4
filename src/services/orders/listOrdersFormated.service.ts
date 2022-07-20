import { listOrdersRepository } from "../../repositories/orders";

const listOrdersFormatedService = async (page = 1) => {
    const orders = await listOrdersRepository();

    const ordersPerPage = 25
    const ordersQuantity = orders.length
    const pages = Math.ceil(ordersQuantity/ordersPerPage)
    const ordersToShow = orders.filter((_, index) => {
        const lastIndex = page*ordersPerPage
        const firstIndex = lastIndex-ordersPerPage

        return index>=firstIndex && index<lastIndex
    })    

    const requestResult = {
        itensQuantity: ordersQuantity,
        totalPages: pages,
        page,
        orders: ordersToShow
    }
    return requestResult;
};

export default listOrdersFormatedService;