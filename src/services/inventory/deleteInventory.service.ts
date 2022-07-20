import { IInventoryList } from "../../interfaces/inventory";
import {
  deleteInventoryRepository,
  listInventoryRepository,
} from "../../repositories/inventory";

import { AppError } from "../../errors/appError";

const deleteInventoryService = async ({ id }: IInventoryList) => {
  const inventory = await listInventoryRepository();

  const item = inventory.find((value) => value.id === id);

  if (!item) {
    throw new AppError("Item not found", 404);
  }

  await deleteInventoryRepository(id);

  return true;
};

export default deleteInventoryService;
