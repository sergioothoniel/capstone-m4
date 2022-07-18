import { Response } from "express";

export class AppError extends Error {
  statusCode

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}


export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  })

}