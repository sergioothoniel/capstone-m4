import { Request, Response, NextFunction } from "express";

import { ICategoryRequest } from "../../interfaces/categories";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const categoryCreateSchema: SchemaOf<ICategoryRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

export const validateCategoryCreate =
  (schema: SchemaOf<ICategoryRequest>) =>
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
