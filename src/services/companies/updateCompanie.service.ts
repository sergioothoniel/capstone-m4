import { IUpdateCompanie } from "../../interfaces/companies";
import { listCompaniesRepository, updateCompaiesRepository } from "../../repositories/companies";
import { AppError } from "../../errors/appError";


const updateCompanieService = async ({ id, name }: IUpdateCompanie) => {
 
  const companies = await listCompaniesRepository();

  const companyToUpdate = companies.find((company) => company.id === id);

  if(!companyToUpdate){
    throw new AppError("Company not found", 404)
  }

  const companyUpdated = await updateCompaiesRepository(id, name)

  return companyUpdated
};

export default updateCompanieService;
