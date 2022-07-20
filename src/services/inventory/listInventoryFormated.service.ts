import { listInventoryRepository } from "../../repositories/inventory";

const listInventoryFormatedService = async (page = 1) => {
  const ineventory = await listInventoryRepository();  

  const productsPerPage = 25;
  const inventoryQuantity = ineventory.length;
  const pages = Math.ceil(inventoryQuantity / productsPerPage);
  const iproductsToShow = ineventory.filter((_, index) => {
    const lastIndex = page * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;

    return index >= firstIndex && index < lastIndex;
  });

  const requestResult = {
    itensQuantity: inventoryQuantity,
    totalPages: pages,
    page,
    inventories: iproductsToShow,
  };

  return requestResult;
};

export default listInventoryFormatedService;
