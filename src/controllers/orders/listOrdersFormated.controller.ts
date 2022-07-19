import { Request, Response } from "express"
import listOrdersFormatedService from "../../services/orders/listOrdersFormated.service"

const listOrdersFormatedController = async (req: Request, res: Response) =>{
    const {page} = req.query    

    const ordersList = await listOrdersFormatedService(page ? Number(page) : 1)

    return res.status(200).json(ordersList)
}

export default listOrdersFormatedController