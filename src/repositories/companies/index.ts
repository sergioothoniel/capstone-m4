import appDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
<<<<<<< HEAD
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
=======
import { ICompanie, ICreateCompanie } from "../../interfaces/companies";

export const companiesRepository = appDataSource.getRepository(Company)

export const listCompaniesRepository = async () =>{
    const companies = await companiesRepository.find()
    return companies
}
>>>>>>> 76a2373889309f66e93d3592c2c73e7881a296ce

export const createCompaniesRepository = (
  { name, cnpj }: ICreateCompany
): ICreateCompany => {
  const company = companiesRepository.create({ name, cnpj });
  return company;
};

<<<<<<< HEAD
export const saveCompaniesRepository = async (
  newCompanie: ICreateCompany
): Promise<ICreateCompany> => {
  const company = await companiesRepository.save(newCompanie);
  return company;
};
=======
export const createCompaniesRepository = (newCompanie: ICreateCompanie) =>{
    const company = companiesRepository.create(newCompanie)
    return company
}
>>>>>>> 76a2373889309f66e93d3592c2c73e7881a296ce

export const deleteCompaniesRepository = async ({ id }: IDeleteCompany) => {
  const companies = await listCompaniesRepository();

  const companyToDelete = companies.find((company) => company.id === id);

  await companiesRepository.delete(companyToDelete!.id);
};

export const updateCompanyRepository = async ({ id, data }: IUpdateCompany) => {
  const companies = await listCompaniesRepository();

  const companyToUpdate = companies.find((company) => company.id === id);

<<<<<<< HEAD
  await companiesRepository.update(companyToUpdate!.id, data);

  const companiesNewList = await listCompaniesRepository();

  const companyUpdated = companiesNewList.find((company) => company.id === id);

  return companyUpdated;
};
=======
export const updateCompaiesRepository = async (id: string, name: string) =>{

    await companiesRepository.update({id: id}, {name: name})

    const companies = await listCompaniesRepository()
    const companyUpdated = companies.find(company => company.id === id)

    return companyUpdated
}

>>>>>>> 76a2373889309f66e93d3592c2c73e7881a296ce
