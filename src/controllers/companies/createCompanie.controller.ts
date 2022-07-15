import { Request, Response } from "express";
import createCompanieService from "../../services/companies/createCompanie.service";

const createCompanieController = async (req: Request, res: Response) => {
  try {
    const { name, cnpj } = req.body;

    const newCompanie = await createCompanieService({ name, cnpj });

    return res.status(201).send(newCompanie);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default createCompanieController;
