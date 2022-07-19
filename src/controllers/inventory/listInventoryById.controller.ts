import { Request, Response } from "express";
import listInventoryByIdService from "../../services/inventory/listInventoryById.service";

const listInventoryByIdController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const inventoryId = await listInventoryByIdService({ id });

  return response.status(200).json(inventoryId);
};
export default listInventoryByIdController;
