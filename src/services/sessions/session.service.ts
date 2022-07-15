import jwt from "jsonwebtoken"
import { compare } from "bcryptjs"
import "dotenv/config"
import { IUserLogin } from "../../interfaces/users"
import { usersRepository } from "../../repositories/users"

const userSessionService = async ({ email, password }:IUserLogin):Promise<string> => {

    const user = await usersRepository.findOne({

        where: {

            email: email

        }

    });

    if (!user) {

        //erro 403
        throw new Error("Invalid credentials");

    }

    if (!user.active) {

        //erro 403
        throw new Error("User is not active");

    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {

        //erro 403
        throw new Error("Invalid credentials");

    }

    const token = jwt.sign({

        id: user.id,
        permission_id: user.permission_id

    }, process.env.SECRET_KEY as string, {

        expiresIn: "1h"

    });

    return token;

}

export default userSessionService;