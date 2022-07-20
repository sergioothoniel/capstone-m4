import { Request, Response, NextFunction } from "express";

import { IPermissionsRequest } from "../../interfaces/permissions";
import * as yup from "yup";

import { SchemaOf } from "yup";

export const permissionCreateSchema: SchemaOf<IPermissionsRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

export const validatePermissionCreate =
  (schema: SchemaOf<IPermissionsRequest>) =>
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
