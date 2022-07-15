import appDataSource from "../../data-source";
import { IDeleteCompanie } from "../../interfaces/companies";
import { Company } from "../../entities/company.entity";


const deleteCompanieService = async ({ id }: IDeleteCompanie) => {
  const companieRepository = appDataSource.getRepository(Company);

  const companies = await companieRepository.find();

  const companie = companies.find((user: any) => user.id === id);

  await companieRepository.delete(companie!.id);

  return true;
};

export default deleteCompanieService;
