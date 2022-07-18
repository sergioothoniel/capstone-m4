import { Router } from "express";
import loginController from "../controllers/sessions/login.controller";

const loginRoute = Router()

loginRoute.post("", loginController)

export default loginRoute