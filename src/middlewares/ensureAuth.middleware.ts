import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"

const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) =>{

    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const splitToken = token.split(" ")

    jwt.verify(splitToken[1], process.env.SECRET_KEY as string, (error: any, decoded: any) =>{
        if(error){
            return res.status(401).json({
                message: "Invalid token"
            })
        }

        req.userData = {
            id: decoded.id,
            permission: decoded.permission
        } 
        
        next()        
    })   

}

export default ensureAuthMiddleware