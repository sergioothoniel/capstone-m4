import { AppError } from "../../errors/appError"
import { listUsersRepository } from "../../repositories/users"

const listOneUserService = async (id: string) =>{
    console.log(id)
    const users = await listUsersRepository()
    const userToShow = users.find(user => user.id === id)

    if(!userToShow){
        throw new AppError("User not Foud!", 404)
    }

    return {...userToShow, password: undefined}
}

export default listOneUserService