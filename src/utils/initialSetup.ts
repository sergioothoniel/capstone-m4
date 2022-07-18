import { createCompaniesRepository, saveCompaniesRepository } from "../repositories/companies"
import { createPermissionsRepository, savePermissionRepository } from "../repositories/permissions"
import { createUsersRepository, saveUsersRepository } from "../repositories/users"
import listCompaniesService from "../services/companies/listCompanies.service"
import listPermissionsService from "../services/permissions/listPermissions.service"
import listUserService from "../services/users/listUser.service"
import { hash } from "bcryptjs";

const initialSetup = async (): Promise<void> =>{
    const users = await listUserService()
    const userMaster = users.find(user => user.email === "master@master.com")
  
    if(!userMaster){
      const permissions = await listPermissionsService()
      const permissionAdmin = permissions.find(permission => permission.name === "admin")
  
      if(!permissionAdmin){
        const permission = createPermissionsRepository({ name: "admin" })
        await savePermissionRepository(permission)       
      }

      const companies = await listCompaniesService()
      const companyDefault = companies.find(company => company.cnpj === "00000")

      if(!companyDefault){
        const company = createCompaniesRepository({name: "default", cnpj: "00000"})
        await saveCompaniesRepository(company)
      }
  
      const permissionsList = await listPermissionsService()
      const newPermissionAdmin = permissionsList.find(permission => permission.name === "admin")
  
      const companiesList = await listCompaniesService()
      const newCompanyDefault = companiesList.find(company => company.cnpj === "00000")

      const hashedPassword = await hash(process.env.MASTERUSER_PASSWORD as string, 10);
  
      const user = createUsersRepository({
        name: "master",
        cpf: "00000000",
        email: "master@master.com",
        password: hashedPassword,
        active: true,
        permission: newPermissionAdmin,
        company: newCompanyDefault 
     });
  
     const newUser = await saveUsersRepository(user)
  
    }
}

export default initialSetup