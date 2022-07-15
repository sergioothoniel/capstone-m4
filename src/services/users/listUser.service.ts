import { IUserResponse } from "../../interfaces/users";
import { usersRepository } from "../../repositories/users";

const listUserService = async (): Promise<IUserResponse[]> => {

    const users = await usersRepository.find();

    return users;

}

export default listUserService;