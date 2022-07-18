import { Request, Response } from "express";
import showMyUserService from "../../services/users/showMyUser.service";

const listMyUserController = async (req: Request, res: Response) =>{
    const {id} = req.userData  
    console.log(req)
    
    const myUser = await showMyUserService(id)

    return res.status(200).json(myUser)
}

export default listMyUserController