import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import type { User } from "../schemas/User.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as User;
    const userExists = await UserModel.findOne({ username: username });
    if (userExists) {
      return errorResponse(res, 409, "UserName is already exists");
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      password: hashPass,
    });

    successResponse(res, user, "User Created Successfully");
  } catch (error) {
    errorResponse(res, 500, "Server Error");
  }
};
export const userSignin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as User;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return errorResponse(res, 404, "User Not Found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return errorResponse(res, 409, "Invalid Credentails");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie("Bearer", token, {
      maxAge: 15 * 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    successResponse(res, { user, token }, "User Logged In ");
  } catch (error) {
    errorResponse(res, 500, "Server Error");
  }
};
