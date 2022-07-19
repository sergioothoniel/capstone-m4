import { Router } from "express";

const inventoryRoutes = Router();

import createInventoryController from "../controllers/inventory/createInventory.controller";
import listInventoryController from "../controllers/inventory/listInventory.controller";
import listInventoryFormatedController from "../controllers/inventory/listInventoriesFormated.controller";
import listInventoryByIdController from "../controllers/inventory/listInventoryById.controller";
import updateInventoryController from "../controllers/inventory/updateInventory.controller";
import deleteInventoryController from "../controllers/inventory/deleteInventory.controller";

inventoryRoutes.post("", createInventoryController);
inventoryRoutes.get("", listInventoryController);
inventoryRoutes.get("/listall", listInventoryFormatedController);
inventoryRoutes.get("/:id", listInventoryByIdController);
inventoryRoutes.patch("/:id", updateInventoryController);
inventoryRoutes.delete("/:id", deleteInventoryController);

export default inventoryRoutes;
