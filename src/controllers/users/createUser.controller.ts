import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {    

    const data = req.body;

    const newUser = await createUserService(data);
    
    return res.status(201).json({

        message: "User Created",
        newUser

    });       

}

export default createUserController