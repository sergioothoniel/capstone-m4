import { Request, Response } from "express";

import createInventoryService from "../../services/inventory/createInventory.service";

const createInventoryController = async (req: Request, res: Response) => {
  const { product_id, unitary_value, quantity } = req.body;

  const product = await createInventoryService({
    product_id,
    unitary_value,
    quantity,
  });

  return res.status(201).send(product);
};

export default createInventoryController;
