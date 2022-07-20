import { Request, Response } from "express";
import listPermissionsService from "../../services/permissions/listPermissions.service";

const listPermissionsController = async (req: Request, res: Response) => {
    const permissions = await listPermissionsService()

    return res.status(200).json(permissions)    
}

export default listPermissionsController