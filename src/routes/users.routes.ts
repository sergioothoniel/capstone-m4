import Router from 'express';
import { createUserController, listUserController } from "../controllers/users/user.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", listUserController);

export default userRouter;
