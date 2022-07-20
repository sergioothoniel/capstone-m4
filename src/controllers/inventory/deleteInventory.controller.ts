import { Request, Response } from "express";
import deleteInventoryService from "../../services/inventory/deleteInventory.service";

const deleteInventoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await deleteInventoryService({ id });

  return res.status(200).json({ message: "Inventory deleted" });
};

export default deleteInventoryController;
