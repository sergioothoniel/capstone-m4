import { AppError } from "../../errors/appError";
import { IPermissionsResponse } from "../../interfaces/permissions";
import { listPermissionsRepository, updatePermissionRepository } from "../../repositories/permissions";

const updatePermissionService = async (id: number, name: string) =>{

    const permissions = await listPermissionsRepository()
    const permissionExists = permissions.find(permission => permission.id === id)

    if(!permissionExists){
        throw new AppError("Permission not found", 404)
    }

    const permissionUpdated = updatePermissionRepository(id, name)

    return permissionUpdated
}

export default updatePermissionService