import appDataSource from "../../data-source";
import { IDeleteCompanie } from "../../interfaces/companies";
import { Company } from "../../entities/company.entity";
import { deleteCompaniesRepository, listCompaniesRepository } from "../../repositories/companies";
import { AppError } from "../../errors/appError";


const deleteCompanieService = async ({ id }: IDeleteCompanie) => {
  
  const companies = await listCompaniesRepository()

  const companie = companies.find((company: any) => company.id === id);

  if(!companie){
    throw new AppError("Company not found", 404)
  }

  await deleteCompaniesRepository(id)
};

export default deleteCompanieService;
