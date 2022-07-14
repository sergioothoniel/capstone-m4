import appDataSource from "../../data-source";
import { Companie } from "../../entities/companies.entity";

const listCompaniesService = async () => {
  const companieRepository = appDataSource.getRepository(Companie);

  const companies = companieRepository.find();

  return companies;
};

export default listCompaniesService;
