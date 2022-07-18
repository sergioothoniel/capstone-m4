import { AppError } from "../../errors/appError"
import { createPermissionsRepository, listPermissionsRepository, savePermissionRepository } from "../../repositories/permissions"


const createPermissionService = async (name: string) => {


    const permissions = await listPermissionsRepository()
    const permissionAlreadyRegistred = permissions.find(permission => permission.name === name)


    if (permissionAlreadyRegistred) {
        throw new AppError("Permission Already Registred", 404)
    }

    const permission = createPermissionsRepository({ name })
    const permissionCreated = await savePermissionRepository(permission)

    return permissionCreated

}

export default createPermissionService