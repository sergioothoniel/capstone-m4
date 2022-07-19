import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import listInventoryByIdService from "../services/inventory/listInventoryById.service";

const ensureInventoryQuantityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { type_order, quantity } = req.body;
  const product = await listInventoryByIdService({ id });

  if (
    (product.quantity <= 0 || product.quantity < quantity) &&
    type_order === "output"
  ) {
    throw new AppError("Inventory not have quantity", 400);
  }

  next();
};

export default ensureInventoryQuantityMiddleware;
