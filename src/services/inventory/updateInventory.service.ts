import { AppError } from "../../errors/appError";
import { IInventoryUpdate } from "../../interfaces/inventory";
import {
  listInventoryRepository,
  updateInventoryRepository,
} from "../../repositories/inventory";

const updateInventoryService = async ({
  id,
  type_order,
  data,
}: IInventoryUpdate) => {
  const inventories = await listInventoryRepository();

  const inventoryAlreadyExists = inventories.find(
    (user: any) => user.id === id
  );

  if (!inventoryAlreadyExists) {
    throw new AppError("Inventory not found!", 404);
  }
  if (!type_order) {
    throw new AppError("Input a valid type!", 404);
  }

  if (type_order === "input") {
    const newQuantity = inventoryAlreadyExists.quantity + Number(data.quantity);

    const newUnitaryValue = data.unitary_value
      ? data.unitary_value
      : inventoryAlreadyExists.unitary_value;

    data = {
      quantity: newQuantity,
      unitary_value: newUnitaryValue,
    };

    const updateInventory = await updateInventoryRepository({ id, data });
    return updateInventory;
  }
  
  if (type_order === "output") {
    const newQuantity = inventoryAlreadyExists.quantity - data.quantity;
    const newUnitaryValue = data.unitary_value
      ? data.unitary_value
      : inventoryAlreadyExists.unitary_value;

    data = {
      quantity: newQuantity,
      unitary_value: newUnitaryValue,
    };

    const updateInventory = await updateInventoryRepository({ id, data });
    return updateInventory;
  }

};

export default updateInventoryService;
