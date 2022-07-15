import { AppError } from "../../errors/appError";
import { IUpdateCompany } from "../../interfaces/companies";

import {
  listCompaniesRepository,
  updateCompanyRepository,
} from "../../repositories/companies";

const updateCompanieService = async ({ id, data }: IUpdateCompany) => {
  const companies = await listCompaniesRepository();
  
  const companyAlreadyExists = companies.find((user: any) => user.id === id);
  
  if (!companyAlreadyExists) {
    throw new AppError("Company not found!", 404);
  }

  const updateCompany = await updateCompanyRepository({ id, data });

  return updateCompany;
};

export default updateCompanieService;
