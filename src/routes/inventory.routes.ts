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
import ensureInventoryQuantityMiddleware from "../middlewares/ensureInventoryQuantity.middleware";
import listInventoryByProductIdController from "../controllers/inventory/listInventoryByProductId.controller";

inventoryRoutes.post(
  "",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  createInventoryController
);
inventoryRoutes.get("/listall", listInventoryController);
inventoryRoutes.get("", listInventoryFormatedController);
inventoryRoutes.get("/products/:productId", ensureAuthMiddleware,listInventoryByProductIdController)
inventoryRoutes.get("/:id", listInventoryByIdController);
inventoryRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  ensureInventoryQuantityMiddleware,
  updateInventoryController
);
inventoryRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  deleteInventoryController
);

export default inventoryRoutes;
