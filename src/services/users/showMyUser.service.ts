import { listUsersRepository } from "../../repositories/users"

const showMyUserService = async (id: string) =>{
    const users = await listUsersRepository()
    const myUser = users.find(user => user.id === id)   

    return myUser
}

export default showMyUserService