import { AppError } from "../../errors/appError";
import { IInventoryList } from "../../interfaces/inventory";
import { inventorysRepository } from "../../repositories/inventory";

const listInventoryByIdService = async ({ id }: IInventoryList) => {
  const inventoryId = await inventorysRepository.findOneBy({ id: id });

  if (!inventoryId) {
    throw new AppError("Inventory not found", 404);
  }

  return inventoryId;
};
export default listInventoryByIdService;
