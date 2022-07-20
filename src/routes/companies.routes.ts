import { Router } from "express";

const companiesRoutes = Router();

import createCompanieController from "../controllers/companies/createCompanie.controller";
import listCompaniesController from "../controllers/companies/listCompanies.controller";
import updateCompanyController from "../controllers/companies/updateCompanie.controller";

import deleteCompanyController from "../controllers/companies/deleteCompanie.controller";

import {
  validateCompanyCreate,
  companyCreateSchema,
} from "../middlewares/validations/validateCompanyCreate.middleware";

companiesRoutes.post(
  "",
  validateCompanyCreate(companyCreateSchema),
  createCompanieController
);
companiesRoutes.get("", listCompaniesController);
companiesRoutes.patch("/:id", updateCompanyController);
companiesRoutes.delete("/:id", deleteCompanyController);

export default companiesRoutes;
