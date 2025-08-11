import express from "express";
import {
  createContent,
  createUserHandler,
  userLogout,
  userSignin,
} from "../controllers/user.controllers.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "../schemas/User.js";
import { auth } from "../middleware/auth.js";
import { contentSchema } from "../schemas/Content.js";
const router = express.Router();

router.post("/signup", validate(userSchema), createUserHandler);
router.post("/signin", validate(userSchema), userSignin);
router.post("/logout", userLogout);
// router.post("/forgot-password", auth, forgotPass);

router.post("/add", validate(contentSchema),auth,createContent);


export default router;
