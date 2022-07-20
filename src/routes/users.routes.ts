import Router from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listMyUserController from "../controllers/users/listMyUser.controller";
import listOneUserController from "../controllers/users/listOndeUser.controller";
import listUserController from "../controllers/users/listUser.controller";
import listUserFormatedController from "../controllers/users/listUsersFormated.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middleware";

import {
  validateUserCreate,
  userCreateSchema,
} from "../middlewares/validations/validateUserCreate.middleware";

const userRouter = Router();

userRouter.post(
  "",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  validateUserCreate(userCreateSchema),
  createUserController
);
userRouter.get("", ensureAuthMiddleware, listUserFormatedController);
userRouter.get("/listall", ensureAuthMiddleware, listUserController);
userRouter.get("/me", ensureAuthMiddleware, listMyUserController);
userRouter.get(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  listOneUserController
);
userRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  updateUserController
);
userRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensurePermissionMiddleware,
  deleteUserController
);

export default userRouter;
