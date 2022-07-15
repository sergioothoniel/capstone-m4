import appDataSource from "../../data-source";
import { Companie } from "../../entities/companies.entity";
import { ICompanie, ICreateCompanie } from "../../interfaces/companies";

export const companiesRepository = appDataSource.getRepository(Companie)

export const listCompaniesRepository = async (): Promise<ICompanie[]> =>{
    const companies = await companiesRepository.find()
    return companies
}


export const createCompaniesRepository = (newCompanie: ICreateCompanie): ICreateCompanie =>{
    const company = companiesRepository.create(newCompanie)
    return company
}

export const saveCompaniesRepository = async (newCompanie: ICreateCompanie): Promise<ICreateCompanie> =>{
    const company = await companiesRepository.save(newCompanie)
    return company
}

export const deleteCompaniesRepository = async (id: string) =>{

    const companies = await listCompaniesRepository()

    const companyToDelete = companies.find(company => company.id === id)

    await companiesRepository.delete(companyToDelete!.id)
}

