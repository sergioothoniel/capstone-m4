import { Request, Response } from "express"
import userSessionService from "../../services/sessions/session.service";

export const userSessionController = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const token = await userSessionService({ email, password });

    return res.status(200).json({token});

}