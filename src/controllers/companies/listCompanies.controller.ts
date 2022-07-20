import { Request, Response } from "express";
import listCompaniesService from "../../services/companies/listCompanies.service";

const listCompaniesController = async (req: Request, res: Response) => {
  const users = await listCompaniesService();
  return res.status(200).send(users);
};

export default listCompaniesController;
