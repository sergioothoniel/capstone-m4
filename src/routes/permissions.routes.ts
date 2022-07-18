import { Router } from "express";
import createPermissionController from "../controllers/permissions/createPermission.controller";
import deletePermissionController from "../controllers/permissions/deletePermission.controller";
import listPermissionsController from "../controllers/permissions/listPermissions.controller";
import updatePermissionController from "../controllers/permissions/updatePermission.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middleware";

const permissionsRoutes = Router()

permissionsRoutes.post("",ensureAuthMiddleware, ensurePermissionMiddleware, createPermissionController)
permissionsRoutes.get("", ensureAuthMiddleware, ensurePermissionMiddleware, listPermissionsController)
permissionsRoutes.delete("/:id", ensureAuthMiddleware, ensurePermissionMiddleware, deletePermissionController)
permissionsRoutes.patch("/:id", ensureAuthMiddleware, ensurePermissionMiddleware, updatePermissionController)

export default permissionsRoutes