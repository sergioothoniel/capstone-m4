import { AppError } from "../../errors/appError";
import { IInventoryUpdate } from "../../interfaces/inventory";
import {
  listInventoryRepository,
  updateInventoryRepository,
} from "../../repositories/inventory";

const updateInventoryService = async ({ id, data }: IInventoryUpdate) => {
  const inventories = await listInventoryRepository();

  const inventoryAlreadyExists = inventories.find((user: any) => user.id === id);

  if (!inventoryAlreadyExists) {
    throw new AppError("Inventory not found!", 404);
  }

  const updateInventory = await updateInventoryRepository({id, data});

  return updateInventory;
};

export default updateInventoryService;
