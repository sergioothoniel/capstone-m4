import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { usersRepository } from "../../repositories/users";
import { listPermissionsRepository } from "../../repositories/permissions";
import { listCompaniesRepository } from "../../repositories/companies";
import { AppError } from "../../errors/appError";

const createUserService = async ({name, email, cpf, password, company_id, permission_id}: IUserRequest): Promise<IUserResponse> => {

    const hashedPassword = await hash(password, 10);
    
    const permissionsList = await listPermissionsRepository()
    const permissionSearched = permissionsList.find(permission => permission.id === permission_id)

    if(!permissionSearched){
        throw new AppError("Permission is incorrect")
    }
    
    const companiesList = await listCompaniesRepository()
    const companySearched = companiesList.find(company => company.id === company_id)

    if(!companySearched){
        throw new AppError("Permission is incorrect")
    }

    const user = usersRepository.create({
       name: name,
       cpf: cpf,
       email: email,
       password: hashedPassword,
       active: true,
       permission: permissionSearched,
       company: companySearched   

    });

    await usersRepository.save(user);

    return user;
}

export default createUserService;