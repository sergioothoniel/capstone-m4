import { ICreateCompany } from "../../interfaces/companies";
import {
  createCompaniesRepository,
  listCompaniesRepository,
  saveCompaniesRepository,
} from "../../repositories/companies";
import { AppError } from "../../errors/appError";

const createCompanieService = async ({ name, cnpj }: ICreateCompany) => {
  const companies = await listCompaniesRepository();

  const companyAlreadyExists = companies.find(
    (user: any) => user.cnpj === cnpj
  );

  if (companyAlreadyExists) {
    throw new AppError("Company already exists!", 404);
  }

  const newCompany = createCompaniesRepository({ name, cnpj });

  await saveCompaniesRepository(newCompany)
  
  return newCompany;
};

export default createCompanieService;
