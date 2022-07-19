import { Router } from "express";

import createOrderController from "../controllers/orders/createOrder.controller";
import listAllOrdersController from "../controllers/orders/listAllOrders.controller";
import listOneOrderController from "../controllers/orders/listOneOrder.controller";
import deleteOrderController from "../controllers/orders/deleteUser.controller";
import updateOrderController from "../controllers/orders/updateOrder.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middleware";

import {
  orderCreateSchema,
  validateOrderCreate,
} from "../middlewares/validations/validateOrderCreate.middleware";

const ordersRoutes = Router();

ordersRoutes.post(
  "",
  ensureAuthMiddleware,
  validateOrderCreate(orderCreateSchema),
  createOrderController
);

// ordersRoutes.get(
//   "",
//   ensureAuthMiddleware,
//   ensurePermissionMiddleware,
//   listOrdersController
// );
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
