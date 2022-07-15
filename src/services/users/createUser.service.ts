import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { usersRepository } from "../../repositories/users";
import appDataSource from "../../data-source";
import { Permission } from "../../entities/permission.entity";
import { Company } from "../../entities/company.entity";

const createUserService = async (data: IUserRequest): Promise<IUserResponse> => {

    const hashedPassword = await hash(data.password, 10);

    const permissioRepository = appDataSource.getRepository(Permission)
    const permissionsList = await permissioRepository.find()
    const permissionSearched = permissionsList.find(permission => permission.id === data.permission_id)

    const companyRepository = appDataSource.getRepository(Company)
    const companiesList = await companyRepository.find()
    const companySearched = companiesList.find(company => company.id === data.company_id)

    const user = usersRepository.create({
       name: data.name,
       cpf: data.cpf,
       email: data.email,
       password: hashedPassword,
       active: true,
       permission: permissionSearched,
       company: companySearched   

    });

    await usersRepository.save(user);

    return user;

}

export default createUserService;