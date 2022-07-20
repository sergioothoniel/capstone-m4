import { Request, Response, NextFunction } from "express";

import { IUserRequest } from "../../interfaces/users";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const userCreateSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required().min(11).max(11),
  password: yup.string().required(),
  company_id: yup.string().required(),
  permission_id: yup.number().required(),
});

export const validateUserCreate =
  (schema: SchemaOf<IUserRequest>) =>
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
