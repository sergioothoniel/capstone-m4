import { IDeleteCompany } from "../../interfaces/companies";

import {
  deleteCompaniesRepository,
  listCompaniesRepository,
} from "../../repositories/companies";
import { AppError } from "../../errors/appError";

const deleteCompanyService = async ({ id }: IDeleteCompany) => {
  const companies = await listCompaniesRepository();

  const companyAlreadyExists = companies.find((user: any) => user.id === id);

  if (!companyAlreadyExists) {
    throw new AppError("Company not found", 404);
  }

  await deleteCompaniesRepository(id);

  return true;
};

export default deleteCompanyService;
