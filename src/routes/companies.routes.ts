import { Router } from "express";

const routes = Router();

import createCompanieController from "../controllers/companies/createCompanie.controller";
import listCompaniesController from "../controllers/companies/listCompanies.controller";
import updateCompanieService from "../services/companies/updateCompanie.service";
import deleteCompanieService from "../services/companies/deleteCompanie.service";

routes.post("/companies", createCompanieController);
routes.get("/companies",  listCompaniesController);
routes.patch("/companies/:id", updateCompanieService);
routes.delete("/companies/:id", deleteCompanieService);

export default routes;