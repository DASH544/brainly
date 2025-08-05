import express from "express";
import {  createUserHandler } from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/signup", createUserHandler);

export default router;
