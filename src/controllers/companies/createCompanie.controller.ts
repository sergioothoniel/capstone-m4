import { Request, Response } from "express";
import createCompanieService from "../../services/companies/createCompanie.service";

const createCompanieController = async (req: Request, res: Response) => {
 
    const { name, cnpj } = req.body;

    const newCompanie = await createCompanieService({ name, cnpj });

    return res.status(201).send(newCompanie);
  
};

export default createCompanieController;
