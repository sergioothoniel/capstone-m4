import { Response } from "express";

export class AppError extends Error {
  statusCode

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
