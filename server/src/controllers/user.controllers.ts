import type { Request, Response } from "express";
import { contentModel, TagModel, UserModel } from "../models/user.model.js";
import type { User } from "../schemas/User.js";
import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import type { AuthRequest } from "../middleware/auth.js";
import type { Content } from "../schemas/Content.js";

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
    res.cookie("Authorization", token, {
      maxAge: 15 * 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    successResponse(res, { user, token }, "User Logged In ");
  } catch (error) {
    errorResponse(res, 500, "Server Error");
  }
};

// export const forgotPass = async (req: AuthRequest, res: Response) => {
//   try {
//     const {username,password}=req.body as User
//     const userId = req.userId;
//     if (!userId) {
//       errorResponse(res, 409, "Please Login Again");
//     }
//     const userExists = await UserModel.findById(userId);
//     if (!userExists) {
//       errorResponse(res, 404, "User Not Found");
//     }
//   } catch (error) {
//     console.error("Forgot Pass Error:", error);
//     errorResponse(res, 500, "Server Error");
//   }
// };

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorization", { httpOnly: true });
    successResponse(res, null, "User Logged Out");
  } catch (error) {
    console.error("Logout Error:", error);
    errorResponse(res, 500, "Server Error");
  }
};
export const createContent = async (req: AuthRequest, res: Response) => {
  try {
    const creatorId = req.userId;
    if (!creatorId) {
      return errorResponse(res, 401, "Unauthorized: Missing user ID");
    }
    const { link, type, title, tags = [] } = req.body as Content;
    const existsTag = await TagModel.find(tags);
    if (!existsTag) {
      const newTags = await TagModel.create({
        title: tags,
      });
    }
    const newContent = await contentModel.create({
      link,
      title,
      type,
      tags,
      userId: creatorId,
    });
    successResponse(res, newContent, "Content Add Successfully");
  } catch (error) {
    console.error("Create Content Error:", error);
    errorResponse(res, 500, "Server Error");
  }
};
export const deleteContent = async (req: AuthRequest, res: Response) => {};
