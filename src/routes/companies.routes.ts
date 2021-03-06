import { Router } from "express";

const companiesRoutes = Router();

import createCompanieController from "../controllers/companies/createCompanie.controller";
import listCompaniesController from "../controllers/companies/listCompanies.controller";
import updateCompanyController from "../controllers/companies/updateCompanie.controller";
import deleteCompanyController from "../controllers/companies/deleteCompanie.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import {
  validateCompanyCreate,
  companyCreateSchema,
} from "../middlewares/validations/validateCompanyCreate.middleware";

companiesRoutes.post("", ensureAuthMiddleware, validateCompanyCreate(companyCreateSchema), createCompanieController);
companiesRoutes.get("", ensureAuthMiddleware, listCompaniesController);
companiesRoutes.patch("/:id", ensureAuthMiddleware, updateCompanyController);
companiesRoutes.delete("/:id", ensureAuthMiddleware, deleteCompanyController);


export default companiesRoutes;
