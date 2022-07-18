import { Request, Response } from "express";
import createPermissionService from "../../services/permissions/createPermission.service";

const createPermissionController = async (req: Request, res: Response) =>{
    const {name} = req.body

    const newPermission = await createPermissionService(name)

    return res.status(201).json({
        message: "Permission Registred",
        newPermission
    })

}

export default createPermissionController

