import jwt from "jsonwebtoken"
import { compare } from "bcryptjs"
import "dotenv/config"
import { IUserLogin } from "../../interfaces/users"
import { usersRepository } from "../../repositories/users"
import { AppError } from "../../errors/appError"

const loginService = async ({ email, password }:IUserLogin) => {

    const users = await usersRepository.find()

    const userToLogin = users.find(user => user.email === email)

    if (!userToLogin) {
        
        throw new AppError("Invalid credentials", 403);
    }

    if (!userToLogin.active) {
        
        throw new AppError("User is not active");
    }

    const passwordMatch = await compare(password, userToLogin.password);

    if (!passwordMatch) {
       
        throw new AppError("Invalid credentials", 403);
    }

    const token = jwt.sign({

        id: userToLogin.id,
        permission: userToLogin.permission.name

    }, process.env.SECRET_KEY as string, {

        expiresIn: "24h"
    });

    return token;
}

export default loginService;