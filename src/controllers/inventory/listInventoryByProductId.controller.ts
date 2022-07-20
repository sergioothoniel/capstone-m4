import { Request, Response } from "express";
import listInventoryByProductIdService from "../../services/inventory/listInventoryByProductId.service";

const listInventoryByProductIdController = async (req: Request, res: Response) =>{
    const {productId} = req.params

    const product = await listInventoryByProductIdService(productId)

    return res.status(200).json(product)
}

export default listInventoryByProductIdController