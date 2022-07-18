import { listUsersRepository} from "../../repositories/users";

const listUserService = async () => {

    const users = await listUsersRepository()
    const usersWithoutPassword = users.map(user => {
        return {...user, password: undefined}
    })

    return usersWithoutPassword;
}

export default listUserService;