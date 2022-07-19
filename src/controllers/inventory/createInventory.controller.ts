import { Request, Response } from "express";

import createInventoryService from "../../services/inventory/createInventory.service";

const createInventoryController = async (req: Request, res: Response) => {
  const { product_id, total_value, quantity } = req.body;

  const newCompanie = await createInventoryService({
    product_id,
    total_value,
    quantity,
  });

  return res.status(201).send(newCompanie);
};

export default createInventoryController;
