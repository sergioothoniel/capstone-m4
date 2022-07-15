import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { usersRepository } from "../../repositories/users";

const createUserService = async (data: IUserRequest): Promise<IUserResponse> => {

    const hashedPassword = await hash(data.password, 10);
    const user = usersRepository.create({

        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: hashedPassword,
        permission_id: data.permission_id,
        company_id: data.company_id,
        active: data.active,
        created_at: new Date(),
        updated_at: new Date()

    });

    await usersRepository.save(user);

    return user;

}

export default createUserService;