import { Request, Response } from "express";
import updatePermissionService from "../../services/permissions/updatePermission.service";

const updatePermissionController = async (req: Request, res: Response) =>{
    const {id} = req.params
    const {name} = req.body

    const permissionUpdated = await updatePermissionService(Number(id), name)

    return res.status(200).json(permissionUpdated)
}

export default updatePermissionController