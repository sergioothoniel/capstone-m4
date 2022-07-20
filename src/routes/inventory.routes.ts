import { Router } from "express";

const inventoryRoutes = Router();

import createInventoryController from "../controllers/inventory/createInventory.controller";
import listInventoryController from "../controllers/inventory/listInventory.controller";
import listInventoryFormatedController from "../controllers/inventory/listInventoriesFormated.controller";
import listInventoryByIdController from "../controllers/inventory/listInventoryById.controller";
import updateInventoryController from "../controllers/inventory/updateInventory.controller";
import deleteInventoryController from "../controllers/inventory/deleteInventory.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middleware";

import {
  validateInventoryCreate,
  inventoryCreateSchema,
} from "../middlewares/validations/validateInventoryCreate.middleware";

inventoryRoutes.post(
  "",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  validateInventoryCreate(inventoryCreateSchema),
  createInventoryController
);
inventoryRoutes.get("", listInventoryController);
inventoryRoutes.get("/listall", listInventoryFormatedController);
inventoryRoutes.get("/:id", listInventoryByIdController);
inventoryRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  updateInventoryController
);
inventoryRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  deleteInventoryController
);

export default inventoryRoutes;
