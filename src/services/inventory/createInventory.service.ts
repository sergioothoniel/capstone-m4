import { v4 as uuid } from "uuid";

import {
  IInventoryRequest,
  IInventoryResponse,
} from "../../interfaces/inventory";

import {
  createInventoryRepository,
  saveInventoryRepository,
} from "../../repositories/inventory";

import listProductByIdService from "../products/listProductById.service";

import { AppError } from "../../errors/appError";

const createInventoryService = async ({
  product_id,
  unitary_value,
  quantity,
}: IInventoryRequest) => {
  const date: Date = new Date();

  const product = await listProductByIdService(product_id);

  const middleValue = quantity / unitary_value;

  const inventoryObject: IInventoryResponse = {
    id: uuid(),
    product: product,
    unitary_value: unitary_value,
    quantity: quantity,
    total_value: middleValue,
    created_at: date,
    updated_at: date,
  };

  
  const newInventory = createInventoryRepository(inventoryObject);
  console.log(newInventory)
  
  const inventory =  await saveInventoryRepository(newInventory);

  return inventory;
};

export default createInventoryService;
