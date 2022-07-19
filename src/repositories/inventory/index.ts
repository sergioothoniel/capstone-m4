import appDataSource from "../../data-source";
import { Inventory } from "../../entities/inventory.entity";
import { Permission } from "../../entities/permission.entity";
import {
  IInventoryRequest,
  IInventoryResponse,
  IInventoryUpdate,
  IInventoryUpdated,
} from "../../interfaces/inventory";
import {
  IPermissionsRequest,
  IPermissionsResponse,
} from "../../interfaces/permissions";

export const inventorysRepository = appDataSource.getRepository(Inventory);

export const listInventoryRepository = async (): Promise<
  IInventoryResponse[]
> => {
  const inventory = await inventorysRepository.find();
  return inventory;
};

export const createInventoryRepository = (newProducts: IInventoryResponse) => {
  const product = inventorysRepository.create(newProducts);
  return product;
};

export const saveInventoryRepository = async (
  newProduct: IInventoryResponse
): Promise<IInventoryResponse> => {
  const product = await inventorysRepository.save(newProduct);

  return product;
};

export const deleteInventoryRepository = async (id: string) => {
  const inventory = await listInventoryRepository();

  const productToDelete = inventory.find((product) => product.id === id);

  await inventorysRepository.delete(productToDelete!.id);
};

export const updateInventoryRepository = async ({
  id,
  data,
}: IInventoryUpdate) => {
  const inventory = await listInventoryRepository();
  const inventoryUpdated = inventory.find((product) => product.id === id);
  
  const newData = data.unitary_value
  ? data.quantity / data.unitary_value
  : data.quantity / inventoryUpdated!.unitary_value;
  
  const newInventoryUpdated: IInventoryUpdated = {
    quantity: data.quantity,
    unitary_value: data.unitary_value,
    total_value: Number(newData.toFixed(2)),
  };
  
  await inventorysRepository.update({ id: id }, newInventoryUpdated);
  
  const listUpdated = await listInventoryRepository();
  const productUpdated = listUpdated.find((product) => product.id === id);

  return productUpdated;
};
