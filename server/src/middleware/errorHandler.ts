import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  errorResponse(res, 500, err);
}
