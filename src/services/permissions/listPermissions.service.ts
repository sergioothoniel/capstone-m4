import { IPermissionsResponse } from "../../interfaces/permissions"
import { listPermissionsRepository } from "../../repositories/permissions"

const listPermissionsService = async (): Promise<IPermissionsResponse[]> =>{
    const permissions = await listPermissionsRepository()
    return permissions
}

export default listPermissionsService