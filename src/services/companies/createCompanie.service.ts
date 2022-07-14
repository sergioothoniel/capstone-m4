import { appDataSource } from "../../data-source";
import { ICreateCompanie } from "../../interfaces/companie.interface";
import { Companie } from "../../entities/companies.entity";
//import * as bcrypt from "bcryptjs";

const createCompanieService = async ({ name, cnpj }: ICreateCompanie) => {
  const companieRepository = appDataSource.getRepository(Companie);

  const companies = await companieRepository.find();

  const companieAlreadyExists = companies.find((user: any) => user.cnpj === cnpj);

  if (companieAlreadyExists) {
    throw new Error("Companie already exists!");
  }

  const newCompanie = new Companie();

  (newCompanie.name = name),
  (newCompanie.cnpj = cnpj),
  companieRepository.create(newCompanie);
  await companieRepository.save(newCompanie);

  return newCompanie;
};

export default createCompanieService;
