import type { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

export const validate =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const validationError = result.error.issues.map((item) => ({
        field: item.path[0],
        message: item.message,
      }));
      return res.status(400).json({ success: false, errors: validationError });
    }
    next();
  };
