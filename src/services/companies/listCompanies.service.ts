import { listCompaniesRepository } from "../../repositories/companies";


const listCompaniesService = async () => {
  
  const companies = await listCompaniesRepository()
  return companies;
};

export default listCompaniesService;
