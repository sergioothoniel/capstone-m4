import { NextFunction, Request, Response } from "express";

const ensurePermissionMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const permission = req.userData.permission

    if(permission !== "admin"){
        return res.status(403).json({message: "User not allowed!"})
    }

    next()
}

export default ensurePermissionMiddleware