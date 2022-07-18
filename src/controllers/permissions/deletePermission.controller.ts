import { Request, Response } from "express";
import deletePermissionService from "../../services/permissions/deletePermission.service";

const deletePermissionController = async (req: Request, res: Response) =>{
    const {id} = req.params

    await deletePermissionService(Number(id))

    return res.status(200).json({message: "Permission deleted"})
}

export default deletePermissionController