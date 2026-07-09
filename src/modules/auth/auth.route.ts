import { Router } from "express";
import { authController } from "./auth.controller";
import { userController } from "../users/users.controller";

const router = Router();

router.post("/login" , authController.loginUser);

router.post("/refresh-token" , authController.refreshToken);


export const authRoutes = router;
