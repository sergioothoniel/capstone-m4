import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express"
import createUserService from "../../services/users/createUser.service";
import listUserService from "../../services/users/listUser.service";

export const createUserController = async (req: Request, res: Response) => {    

        const data = req.body;
    
        const newUser = await createUserService(data);
        
        return res.status(201).json({

            message: "User Created",
            newUser

        });       
    

}

export const listUserController = async (req: Request, res: Response) => {

    try {

        const users = await listUserService();

        return res.status(200).json(instanceToPlain(users))
            
    } catch (error) {
        
        if (error instanceof Error) {
            return res.status(400).send({
              error: error.name,
              message: error.message,
            });
          }

    }

}

