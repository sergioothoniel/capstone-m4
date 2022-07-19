import { Request, Response } from "express";

import listInventoryFormatedService from "../../services/inventory/listInventoryFormated.service";

const listInventoryFormatedController = async (req: Request, res: Response) => {
  const { page } = req.query;

  const inventoriesList = await listInventoryFormatedService(
    page ? Number(page) : 1
  );

  return res.status(200).json(inventoriesList);
};

export default listInventoryFormatedController;
