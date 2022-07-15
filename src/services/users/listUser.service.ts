import { IUserResponse } from "../../interfaces/users";
import { listUsersRepository} from "../../repositories/users";

const listUserService = async (): Promise<IUserResponse[]> => {

    const users = await listUsersRepository()

    return users;

}

export default listUserService;