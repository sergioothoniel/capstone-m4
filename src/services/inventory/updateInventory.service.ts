import { AppError } from "../../errors/appError";
import { IInventoryUpdate } from "../../interfaces/inventory";
import {
  listInventoryRepository,
  updateInventoryRepository,
} from "../../repositories/inventory";

const updateInventoryService = async (id: string, data: IInventoryUpdate) => {
  const inventories = await listInventoryRepository();

  const itemInventory = inventories.find(
    item => item.id === id
  );

  if (!itemInventory) {
    throw new AppError("Item not found!", 404);
  }
  if (!data.type_order) {
    throw new AppError("Input a valid type!");
  }

  if (data.type_order === "input") {

    if(!data.unitary_value){
      throw new AppError("Missing unitary value!")
    }

    const newQuantity = itemInventory.quantity + data.quantity;
    const totalValueInput = data.quantity * data.unitary_value!;
    const newTotalValue = itemInventory.total_value + totalValueInput;
    const newUnitaryValue = newTotalValue / newQuantity;
    
    const newData = {
      quantity: newQuantity,
      unitary_value: newUnitaryValue,
      total_value: newTotalValue,
    };

    const updateInventory = await updateInventoryRepository(id, newData);
    return updateInventory;
  }

  else if(data.type_order === "output") {
    const newQuantity = itemInventory.quantity - data.quantity;
    const newTotalValue = newQuantity * itemInventory.unitary_value;   

    const newData = {
      quantity: newQuantity,
      total_value: newTotalValue,
    };

    const updateInventory = await updateInventoryRepository(id, newData);
    return updateInventory;
  }
};

export default updateInventoryService;
