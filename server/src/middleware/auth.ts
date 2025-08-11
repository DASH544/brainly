import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}
const JWT_SECRET = process.env.JWT_SECRET!;
export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.Authorization;
    if (!token) {
      return errorResponse(res, 401, "Unauthorized: No token provided");
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.error("Auth middleware Error:", error);
    errorResponse(res, 500, "Server Error");
  }
};
