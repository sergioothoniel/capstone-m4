import { listUsersRepository} from "../../repositories/users";

const listUserFormatedService = async (page = 1) => {

    const users = await listUsersRepository()
    const usersWithoutPassword = users.map(user => {
        return {...user, password: undefined}
    })

    const usersPerPage = 15
    const usersQuantity = users.length
    const pages = Math.ceil(usersQuantity/usersPerPage)
    const usersToShow = usersWithoutPassword.filter((_, index) => {
        const lastIndex = page*15
        const firstIndex = lastIndex-15

        return index>=firstIndex && index<lastIndex
    })    

    const requestResult = {
        itensQuantity: usersQuantity,
        totalPages: pages,
        page,
        users: usersToShow
    }

    return requestResult;
}

export default listUserFormatedService;