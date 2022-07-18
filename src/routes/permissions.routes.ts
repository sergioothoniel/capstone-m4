import { Router } from "express";
import createPermissionController from "../controllers/permissions/createPermission.controller";
import deletePermissionController from "../controllers/permissions/deletePermission.controller";
import listPermissionsController from "../controllers/permissions/listPermissions.controller";
import updatePermissionController from "../controllers/permissions/updatePermission.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const permissionsRoutes = Router()

permissionsRoutes.post("",ensureAuthMiddleware, createPermissionController)
permissionsRoutes.get("",ensureAuthMiddleware, listPermissionsController)
permissionsRoutes.delete("/:id",ensureAuthMiddleware, deletePermissionController)
permissionsRoutes.patch("/:id",ensureAuthMiddleware, updatePermissionController)

export default permissionsRoutes