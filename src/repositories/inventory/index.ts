import appDataSource from "../../data-source"
import { Inventory } from "../../entities/inventory.entity"
import { Permission } from "../../entities/permission.entity"
import { IInventoryRequest, IInventoryResponse, IInventoryUpdate } from "../../interfaces/inventory"
import { IPermissionsRequest, IPermissionsResponse } from "../../interfaces/permissions"

export const inventorysRepository = appDataSource.getRepository(Inventory)

export const listInventoryRepository = async (): Promise<IInventoryResponse[]> =>{
    const inventory = await inventorysRepository.find()
    return inventory
}

export const createInventoryRepository = (newProducts: IInventoryRequest): IInventoryResponse =>{
    const product = inventorysRepository.create(newProducts)
    return product
}

export const saveInventoryRepository = async (newProduct: IInventoryRequest): Promise<IInventoryResponse> =>{
    const product = await inventorysRepository.save(newProduct)
    return product
}

export const deleteInventoryRepository = async (id: string) =>{

    const inventory = await listInventoryRepository()

    const productToDelete = inventory.find(product => product.id === id)

    await inventorysRepository.delete(productToDelete!.id)
}

export const updateInventoryRepository = async (id: string, data: IInventoryUpdate)=>{

    await inventorysRepository.update({id: id}, data)

    const invnetory = await listInventoryRepository()
    const productUpdated = invnetory.find(product => product.id === id)

    return productUpdated
}
