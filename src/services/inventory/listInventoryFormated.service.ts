import { listInventoryRepository } from "../../repositories/inventory";

const listInventoryFormatedService = async (page = 1) => {
  const inventories = await listInventoryRepository();
  const inventoriesWithoutPassword = inventories.map((element) => {
    return { ...element, password: undefined };
  });

  const inventoriesPerPage = 15;
  const inventoriesQuantity = inventories.length;
  const pages = Math.ceil(inventoriesQuantity / inventoriesPerPage);
  const inventoriesToShow = inventoriesWithoutPassword.filter((_, index) => {
    const lastIndex = page * 15;
    const firstIndex = lastIndex - 15;

    return index >= firstIndex && index < lastIndex;
  });

  const requestResult = {
    itensQuantity: inventoriesToShow,
    totalPages: pages,
    page,
    inventories: inventoriesToShow,
  };

  return requestResult;
};

export default listInventoryFormatedService;
