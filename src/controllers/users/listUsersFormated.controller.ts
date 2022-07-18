import { Request, Response } from "express";
import listUserFormatedService from "../../services/users/listUsersFormated.service";

const listUserFormatedController = async (req: Request, res: Response) =>{
    const {page} = req.query    

    const usersList = await listUserFormatedService(page ? Number(page) : 1)

    return res.status(200).json(usersList)
}

export default listUserFormatedController