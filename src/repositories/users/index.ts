import appDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserFormated, IUserRequest, IUserResponse, IUserUpdate } from "../../interfaces/users"

export const usersRepository = appDataSource.getRepository(User)

export const listUsersRepository = async () =>{
    const users = await usersRepository.find()

    const usersFormated = users.map((user): IUserFormated => {
        const permissionName = user.permission.name
        const companyName = user.company.name

        const newUser = {...user, permission: permissionName, company: companyName}

        return newUser
    })

    return usersFormated
}

export const createUsersRepository = (newUser: any) =>{
    const user = usersRepository.create(newUser)
    return user
}

export const saveUsersRepository = async (newUser: any) =>{
    const user = await usersRepository.save(newUser)
    const users = await listUsersRepository()
    const userUpdated = users.find(value => value.id === user.id)
    return userUpdated
}

export const deleteUsersRepository = async (id: string) =>{

    const users = await listUsersRepository()

    const userToDelete = users.find(user => user.id === id)

    await usersRepository.delete(userToDelete!.id)
}

export const updateUsersRepository = async (id: string, data: any) =>{

    await usersRepository.update({id: id}, data)

    const users = await listUsersRepository()
    const userUpdated = users.find(user => user.id === id)

    return {...userUpdated, password: undefined}
}
