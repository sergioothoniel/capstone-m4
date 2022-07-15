import appDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import {
  ICompany,
  ICreateCompany,
  IDeleteCompany,
  IUpdateCompany,
} from "../../interfaces/companies";

export const companiesRepository = appDataSource.getRepository(Company);

export const listCompaniesRepository = async (): Promise<ICompany[]> => {
  const companies = await companiesRepository.find();
  return companies;
};

export const createCompaniesRepository = (
  { name, cnpj }: ICreateCompany
): ICreateCompany => {
  const company = companiesRepository.create({ name, cnpj });
  return company;
};

export const saveCompaniesRepository = async (
  newCompanie: ICreateCompany
): Promise<ICreateCompany> => {
  const company = await companiesRepository.save(newCompanie);
  return company;
};

export const deleteCompaniesRepository = async ({ id }: IDeleteCompany) => {
  const companies = await listCompaniesRepository();

  const companyToDelete = companies.find((company) => company.id === id);

  await companiesRepository.delete(companyToDelete!.id);
};

export const updateCompanyRepository = async ({ id, data }: IUpdateCompany) => {
  const companies = await listCompaniesRepository();

  const companyToUpdate = companies.find((company) => company.id === id);

  await companiesRepository.update(companyToUpdate!.id, data);

  const companiesNewList = await listCompaniesRepository();

  const companyUpdated = companiesNewList.find((company) => company.id === id);

  return companyUpdated;
};
