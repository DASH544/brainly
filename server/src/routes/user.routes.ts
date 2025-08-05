import express from "express";
import {
  createUserHandler,
  userSignin,
} from "../controllers/user.controllers.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "../schemas/User.js";
const router = express.Router();

router.post("/signup", validate(userSchema), createUserHandler);
router.post("/signin", validate(userSchema), userSignin);

export default router;
