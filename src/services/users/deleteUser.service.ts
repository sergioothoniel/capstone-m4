import { AppError } from "../../errors/appError"
import { deleteUsersRepository, listUsersRepository } from "../../repositories/users"

const deleteUserService = async (id: string): Promise<void> =>{
    const users = await listUsersRepository()

    const userToDelete = users.find(user => user.id === id)

    if(!userToDelete){
        throw new AppError("User not found", 404)
    }

    await deleteUsersRepository(id)
}

export default deleteUserService