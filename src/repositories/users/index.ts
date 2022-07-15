import appDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserRequest, IUserResponse } from "../../interfaces/users"

export const usersRepository = appDataSource.getRepository(User)

export const listUsersRepository = async (): Promise<IUserResponse[]> =>{
    const users = await usersRepository.find()
    return users
}


export const createUsersRepository = (newUser: IUserRequest): IUserResponse =>{
    const user = usersRepository.create(newUser)
    return user
}

export const saveUsersRepository = async (newUser: IUserRequest): Promise<IUserRequest> =>{
    const user = await usersRepository.save(newUser)
    return user
}

export const deleteUsersRepository = async (id: string) =>{

    const users = await listUsersRepository()

    const userToDelete = users.find(user => user.id === id)

    await usersRepository.delete(userToDelete!.id)
}
