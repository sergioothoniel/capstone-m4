import { Request, Response, NextFunction } from "express";

import { IInventoryRequest } from "../../interfaces/inventory";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const inventoryCreateSchema: SchemaOf<IInventoryRequest> = yup
  .object()
  .shape({
    product_id: yup.string().required(),
    unitary_value: yup.number().required(),
    quantity: yup.number().required(),
  });

export const validateInventoryCreate =
  (schema: SchemaOf<IInventoryRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
