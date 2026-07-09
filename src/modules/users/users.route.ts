import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userController } from "./users.controller";
import { jwtUtils } from "../../utilities/jwt";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utilities/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", userController.registerUser);

router.get(
  "/me",

  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  userController.getMyProfile,
);

router.put("/my-profile" , auth(Role.ADMIN, Role.AUTHOR, Role.USER) , userController.updateMyProfile)

export const userRoutes = router;
