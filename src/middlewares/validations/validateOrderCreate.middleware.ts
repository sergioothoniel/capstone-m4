import { Request, Response, NextFunction } from "express";

import { IOrderCreate } from "../../interfaces/orders";
import * as yup from "yup";

import { SchemaOf } from "yup";

export const orderCreateSchema: SchemaOf<IOrderCreate> = yup.object().shape({
  product_id: yup.string().required(),
  quantity: yup.number().required(),
  type: yup.string().required(),
});

export const validateOrderCreate =
  (schema: SchemaOf<IOrderCreate>) =>
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
