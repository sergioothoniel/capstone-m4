import { Request, Response } from "express";
import listInventoryService from "../../services/inventory/listInventory.service";

const listInventoryController = async (req: Request, res: Response) => {
  const users = await listInventoryService();
  return res.status(200).send(users);
};

export default listInventoryController;
