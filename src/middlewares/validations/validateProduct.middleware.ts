import { Request, Response, NextFunction } from "express";

import { IProductSchema, IProductsRequest } from "../../interfaces/products";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const productCreateSchema: SchemaOf<IProductSchema> = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    category_id: yup.string().required(),
  });

export const validateProductCreate =
  (schema: SchemaOf<IProductSchema>) =>
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
