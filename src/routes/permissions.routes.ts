import { Router } from "express";
import createPermissionController from "../controllers/permissions/createPermission.controller";
import deletePermissionController from "../controllers/permissions/deletePermission.controller";
import listPermissionsController from "../controllers/permissions/listPermissions.controller";
import updatePermissionController from "../controllers/permissions/updatePermission.controller";

const permissionsRoutes = Router()

permissionsRoutes.post("", createPermissionController)
permissionsRoutes.get("", listPermissionsController)
permissionsRoutes.delete("/:id", deletePermissionController)
permissionsRoutes.patch("/:id", updatePermissionController)

export default permissionsRoutes