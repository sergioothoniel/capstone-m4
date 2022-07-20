import { AppError } from "../../errors/appError";
import { IInventoryList } from "../../interfaces/inventory";
import { inventorysRepository, listInventoryRepository } from "../../repositories/inventory";

const listInventoryByIdService = async ({ id }: IInventoryList) => {
  const inventory = await listInventoryRepository()
  const inventoryId = inventory.find(product => product.id === id)

  if (!inventoryId) {
    throw new AppError("Inventory not found", 404);
  }

  return inventoryId;
};
export default listInventoryByIdService;
