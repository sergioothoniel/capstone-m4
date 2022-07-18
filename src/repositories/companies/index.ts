import appDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";
import { ICreateCompany } from "../../interfaces/companies";

export const companiesRepository = appDataSource.getRepository(Company)

export const listCompaniesRepository = async () =>{
    const companies = await companiesRepository.find()
    return companies
}


export const createCompaniesRepository = (newCompanie: ICreateCompany) =>{
    const company = companiesRepository.create(newCompanie)
    return company
}

export const saveCompaniesRepository = async (newCompanie: ICreateCompany): Promise<ICreateCompany> =>{
    const company = await companiesRepository.save(newCompanie)
    return company
}

export const deleteCompaniesRepository = async (id: string) =>{

    const companies = await listCompaniesRepository()

    const companyToDelete = companies.find(company => company.id === id)

    await companiesRepository.delete(companyToDelete!.id)
}

export const updateCompaiesRepository = async (id: string, name: any) =>{

    await companiesRepository.update({id: id}, {name: name})

    const companies = await listCompaniesRepository()
    const companyUpdated = companies.find(company => company.id === id)

    return companyUpdated
}