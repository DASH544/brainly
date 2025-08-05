import express, { type Response } from "express";
import { UserModel } from "../models/user.model.js";

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find({ username });
  } catch (error) {
    return res.status(500).json(error);
  }
};
