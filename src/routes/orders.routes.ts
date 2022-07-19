import { Router } from "express";

import createOrderController from "../controllers/orders/createOrder.controller";
import listAllOrdersController from "../controllers/orders/listAllOrders.controller";
import listOneOrderController from "../controllers/orders/listOneOrder.controller";
import deleteOrderController from "../controllers/orders/deleteUser.controller";
import updateOrderController from "../controllers/orders/updateOrder.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middleware";
import listOrdersFormatedController from "../controllers/orders/listOrdersFormated.controller";

const ordersRoutes = Router();

ordersRoutes.post("", ensureAuthMiddleware, createOrderController);

ordersRoutes.get(
  "",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  listOrdersFormatedController
);

ordersRoutes.get(
  "/listall",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  listAllOrdersController
);
ordersRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  listOneOrderController
);
ordersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  deleteOrderController
);
ordersRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  updateOrderController
);

export default ordersRoutes;
