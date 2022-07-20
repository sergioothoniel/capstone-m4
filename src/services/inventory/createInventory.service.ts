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
import { productsRepository } from "../../repositories/products";

const createInventoryService = async ({
  product_id,
  unitary_value,
  quantity,
}: IInventoryRequest) => {
  
  if (!product_id || !unitary_value || !quantity) {
    throw new AppError("Enter the information correctly!", 400);
  }  

  const products = await productsRepository.find();
  const product = products.find(value => value.id === product_id)


  const total_value = unitary_value * quantity;

  const inventoryObject = {  
    product: product,
    unitary_value: unitary_value,
    quantity: quantity,
    total_value: total_value,    
  };

  const newInventory = createInventoryRepository(inventoryObject);

  const inventory = await saveInventoryRepository(newInventory);

  return inventory;
};

export default createInventoryService;
