import appDataSource from "../../data-source";
import { Company } from "../../entities/company.entity";


const listCompaniesService = async () => {
  const companieRepository = appDataSource.getRepository(Company);

  const companies = companieRepository.find();

  return companies;
};

export default listCompaniesService;
