import { Request, Response, NextFunction } from "express";

import { ICreateCompany } from "../../interfaces/companies";

import * as yup from "yup";

import { SchemaOf } from "yup";

export const companyCreateSchema: SchemaOf<ICreateCompany> = yup
  .object()
  .shape({
    name: yup.string().required(),
    cnpj: yup.string().required(),
  });

export const validateCompanyCreate =
  (schema: SchemaOf<ICreateCompany>) =>
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
