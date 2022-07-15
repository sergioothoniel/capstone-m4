import { Router } from "express";

const routes = Router();

import createCompanieController from "../controllers/companies/createCompanie.controller";
import listCompaniesController from "../controllers/companies/listCompanies.controller";
import updateCompanyController from "../controllers/companies/updateCompanie.controller";

import deleteCompanyController from "../controllers/companies/deleteCompanie.controller";

routes.post("", createCompanieController);
routes.get("", listCompaniesController);
routes.patch("/:id", updateCompanyController);
routes.delete("/:id", deleteCompanyController);

export default routes;
