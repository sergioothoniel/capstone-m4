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
  total_value,
  quantity,
}: IInventoryRequest) => {
  
  if (!product_id || !total_value || !quantity) {
    throw new AppError("Enter the information correctly!", 400);
  }

  const date: Date = new Date();

  const product = await listProductByIdService(product_id);

  const unitary_value = total_value / quantity;

  const inventoryObject: IInventoryResponse = {
    id: uuid(),
    product: product,
    unitary_value: unitary_value,
    quantity: quantity,
    total_value: total_value,
    created_at: date,
    updated_at: date,
  };

  const newInventory = createInventoryRepository(inventoryObject);

  const inventory = await saveInventoryRepository(newInventory);

  return inventory;
};

export default createInventoryService;
