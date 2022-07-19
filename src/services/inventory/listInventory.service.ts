import { listInventoryRepository } from "../../repositories/inventory";

const listInventoryService = async () => {
  return listInventoryRepository();
};

export default listInventoryService;
