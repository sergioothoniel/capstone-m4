import { AppError } from "../../errors/appError"
import { listInventoryRepository } from "../../repositories/inventory"

const listInventoryByProductIdService = async (productId: string) =>{
    const inventory = await listInventoryRepository()
    const product = inventory.filter(value => value.product === productId)

    if(product.length === 0){
        throw new AppError("No product in inventory")
    }

    return product
}

export default listInventoryByProductIdService