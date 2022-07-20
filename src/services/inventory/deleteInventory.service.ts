import { IInventoryList } from "../../interfaces/inventory";
import {
  deleteInventoryRepository,
  listInventoryRepository,
} from "../../repositories/inventory";

import { AppError } from "../../errors/appError";

const deleteInventoryService = async ({ id }: IInventoryList) => {
  const inventories = await listInventoryRepository();

  const inventoryAlreadyExists = inventories.find((user: any) => user.id === id);

  if (!inventoryAlreadyExists) {
    throw new AppError("Inventory not found", 404);
  }

  await deleteInventoryRepository(id);

  return true;
};

export default deleteInventoryService;
