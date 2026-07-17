import { Router } from "express";
import {
  changePassword,
  login,
  session,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validators/authValidators.js";

const authRouter = Router();

authRouter.post("/login", authLimiter, validate(loginSchema), login);
authRouter.get("/session", protect, session);
authRouter.post("/change-password", authLimiter, protect, changePassword);

export default authRouter;
