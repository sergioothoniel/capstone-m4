import appDataSource from "../../data-source"
import { Permission } from "../../entities/permission.entity"
import { IPermissionsRequest, IPermissionsResponse } from "../../interfaces/permissions"

export const permissiosRepository = appDataSource.getRepository(Permission)

export const listPermissionsRepository = async (): Promise<IPermissionsResponse[]> =>{
    const permissions = await permissiosRepository.find()
    return permissions
}


export const createPermissionsRepository = (newPermission: IPermissionsRequest): IPermissionsResponse =>{
    const permission = permissiosRepository.create(newPermission)
    return permission
}

export const savePermissionRepository = async (newPermission: IPermissionsRequest): Promise<IPermissionsResponse> =>{
    const permission = await permissiosRepository.save(newPermission)
    return permission
}

export const deletePermissionRepository = async (id: string) =>{

    const permissions = await listPermissionsRepository()

    const permissionToDelete = permissions.find(permission => permission.id === id)

    await permissiosRepository.delete(permissionToDelete!.id)
}

export const updatePermissionRepository = async (id: string, name: string)=>{

    await permissiosRepository.update({id: id}, {name: name})

    const permissions = await listPermissionsRepository()
    const permissionUpdated = permissions.find(permission => permission.id === id)

    return permissionUpdated
}
