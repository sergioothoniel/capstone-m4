import { listCompaniesRepository } from "../../repositories/companies";

const listCompaniesService = async () => {
  return listCompaniesRepository();
};

export default listCompaniesService;
