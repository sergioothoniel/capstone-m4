import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import updateInventoryService from "../../services/inventory/updateInventory.service";

const updateInventoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    throw new AppError("ID not entered");
  }
  const type_order = data.type_order;
  const inventory = await updateInventoryService({
    id,
    type_order,
    data,
  });

  return res
    .status(201)
    .json({ message: "Inventory updated", inventory: inventory });
};

export default updateInventoryController;
