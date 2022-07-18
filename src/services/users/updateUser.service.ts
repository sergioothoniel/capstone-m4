import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
import { listCompaniesRepository } from "../../repositories/companies";
import { listPermissionsRepository } from "../../repositories/permissions";
import { listUsersRepository, updateUsersRepository } from "../../repositories/users";

const updateUserService = async (id: string, data: IUserUpdate) =>{

    const users = await listUsersRepository()
    const userToUpdate = users.find(user => user.id === id)    
    
    if(!userToUpdate){
        throw new AppError("User not found", 404)
    }

    let newData: any = {...data}
        
    if(data.permission){
        const permissions = await listPermissionsRepository()
        const permissionSearched = permissions.find(value => value.id === data.permission)

        if(!permissionSearched){
            throw new AppError("Permission is incorrect")
        }

       newData.permission = permissionSearched
    }       

    if(data.company){
        const companies = await listCompaniesRepository()
        const companySearched = companies.find(value => value.id === data.company)
        
        if(!companySearched){
            throw new AppError("Company not found", 404)
        }

        newData.company = companySearched
    }   

    const user = await updateUsersRepository(id, newData)

    return user
}

export default updateUserService