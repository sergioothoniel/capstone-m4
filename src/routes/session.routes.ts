import { Router } from "express";
import { userSessionController } from "../controllers/sessions/session.controller";

const sessionRouter = Router();

sessionRouter.post("", userSessionController);

export default sessionRouter