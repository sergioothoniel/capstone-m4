import { appDataSource } from "../../data-source";
import { IDeleteCompanie } from "../../interfaces/companie.interface";
import { Companie } from "../../entities/companies.entity";

const deleteCompanieService = async ({ id }: IDeleteCompanie) => {
  const companieRepository = appDataSource.getRepository(Companie);

  const companies = await companieRepository.find();

  const companie = companies.find((user: any) => user.id === id);

  await companieRepository.delete(companie!.id);

  return true;
};

export default deleteCompanieService;
