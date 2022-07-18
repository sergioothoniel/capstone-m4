import appDataSource from "../../data-source";
import { ICreateCompanie } from "../../interfaces/companies";
import { Company } from "../../entities/company.entity";
import { createCompaniesRepository, listCompaniesRepository, saveCompaniesRepository } from "../../repositories/companies";


const createCompanieService = async ({ name, cnpj }: ICreateCompanie) => {
  
  const companies = await listCompaniesRepository()

  const companieAlreadyExists = companies.find(
    (company: any) => company.cnpj === cnpj
  );

  if (companieAlreadyExists) {
    throw new Error("Companie already exists!");
  }

 const company = createCompaniesRepository({name, cnpj})
 const newCompany = await saveCompaniesRepository(company)

  return newCompany;
};

export default createCompanieService;
