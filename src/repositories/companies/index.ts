import appDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { ICompanie, ICreateCompanie } from "../../interfaces/companies";

export const companiesRepository = appDataSource.getRepository(Company)

export const listCompaniesRepository = async () =>{
    const companies = await companiesRepository.find()
    return companies
}


export const createCompaniesRepository = (newCompanie: ICreateCompanie) =>{
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

export const updateCompaiesRepository = async (id: string, name: string) =>{

    await companiesRepository.update({id: id}, {name: name})

    const companies = await listCompaniesRepository()
    const companyUpdated = companies.find(company => company.id === id)

    return companyUpdated
}

