import Router from 'express';
import createUserController from '../controllers/users/createUser.controller';
import deleteUserController from '../controllers/users/deleteUser.controller';
import listMyUserController from '../controllers/users/listMyUser.controller';
import listOneUserController from '../controllers/users/listOndeUser.controller';
import listUserController from "../controllers/users/listUser.controller";
import listUserFormatedController from '../controllers/users/listUsersFormated.controller';
import updateUserController from '../controllers/users/updateUser.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const userRouter = Router();

userRouter.post("", ensureAuthMiddleware, createUserController);
userRouter.get("", ensureAuthMiddleware, listUserFormatedController)
userRouter.get("/listall", ensureAuthMiddleware, listUserController);
userRouter.get("/:id", ensureAuthMiddleware, listOneUserController)
userRouter.get("/me", ensureAuthMiddleware, listMyUserController)
userRouter.patch("/:id", ensureAuthMiddleware, updateUserController)
userRouter.delete("/:id", ensureAuthMiddleware, deleteUserController)

export default userRouter;
