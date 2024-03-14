import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { userLoginSchema, userRegistrationSchema } from "../schema/userSchema.js";

const router = express.Router();

router.route("/register").post(validateData(userRegistrationSchema), registerUser);
router.route("/login").post(validateData(userLoginSchema), loginUser);
router.route("/logout").post(authenticateUser, logoutUser);

export default router;
