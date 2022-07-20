import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

import updateInventoryService from "../../services/inventory/updateInventory.service";

const updateInventoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const inventory = await updateInventoryService(id, data);

  return res
    .status(201)
    .json({ message: "Inventory updated", inventory: inventory });
};

export default updateInventoryController;
