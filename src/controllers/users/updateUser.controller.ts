import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) =>{
    const {id} = req.params
    const data = req.body

    const userUpdated = await updateUserService(id, data)

    return res.status(200).json(userUpdated)
}

export default updateUserController