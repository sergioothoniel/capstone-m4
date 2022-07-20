import { AppError } from "../../errors/appError"
import { deletePermissionRepository, listPermissionsRepository } from "../../repositories/permissions"

const deletePermissionService = async (id: number): Promise<void> =>{

    const permissions = await listPermissionsRepository()
    const permissionExists = permissions.find(permission => permission.id === id)

    if(!permissionExists){
        throw new AppError("Permission not found", 404)
    }

    await deletePermissionRepository(id)
}

export default deletePermissionService