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

export const listInventoryRepository = async () => {
  const inventory = await inventorysRepository.find();

  const inventoryFormated = inventory.map(value => {
    const product = value.product.id
    return {...value, product}
  })
  return inventoryFormated;
};

export const createInventoryRepository = (newProducts: any) => {
  const product = inventorysRepository.create(newProducts);
  return product;
};

export const saveInventoryRepository = async (
  newProduct: any
) => {
  const product = await inventorysRepository.save(newProduct);

  const productId = product.product.id

  return {...product, product: productId};
};

export const deleteInventoryRepository = async (id: string) => {
  const inventory = await listInventoryRepository();

  const productToDelete = inventory.find((product) => product.id === id);

  await inventorysRepository.delete(productToDelete!.id);
};

export const updateInventoryRepository = async (id: string, data: any) => {
  await inventorysRepository.update({ id: id }, data);

  const listUpdated = await listInventoryRepository();
  
  const productUpdated = listUpdated.find((product) => product.id === id);

  return productUpdated;
};
