import { AppError } from "../../errors/appError";
import { IUpdateCompany } from "../../interfaces/companies";

import {
  listCompaniesRepository,
  updateCompaiesRepository,
} from "../../repositories/companies";

const updateCompanieService = async ({ id, data }: IUpdateCompany) => {
  const companies = await listCompaniesRepository();
  
  const companyAlreadyExists = companies.find((user: any) => user.id === id);
  
  if (!companyAlreadyExists) {
    throw new AppError("Company not found!", 404);
  }

  const updateCompany = await updateCompaiesRepository( id, data.name );

  return updateCompany;
};

export default updateCompanieService;
