import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { createUsersRepository, listUsersRepository, saveUsersRepository, usersRepository } from "../../repositories/users";
import { listPermissionsRepository } from "../../repositories/permissions";
import { listCompaniesRepository } from "../../repositories/companies";
import { AppError } from "../../errors/appError";


const createUserService = async ({name, email, cpf, password, company_id, permission_id}: IUserRequest) => {

    const users = await listUsersRepository()
    const userAlreadyRegistred = users.find(user => user.cpf === cpf || user.email === email) 

    if(userAlreadyRegistred){
        throw new AppError("User already registred")   }    

    const permissionsList = await listPermissionsRepository()
    // const permissionSearched = permissionsList.find(permission => permission.id === permission_id)

    // if(!permissionSearched){
    //     throw new AppError("Permission is incorrect")
    // }

    const companiesList = await listCompaniesRepository()
    const companySearched = companiesList.find(company => company.id === company_id)


    if(!companySearched){
        throw new AppError("Company not found")
    }

    const hashedPassword = await hash(password, 10);

    const user = createUsersRepository({
       name: name,
       cpf: cpf,
       email: email,
       password: hashedPassword,
       active: true,
       permission: permissionSearched,
       company: companySearched   

    });

    const newUser = await saveUsersRepository(user);

    return {...newUser, password: undefined};
}

export default createUserService;