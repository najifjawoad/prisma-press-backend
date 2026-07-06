import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userController } from "./users.controller";
import { jwtUtils } from "../../utilities/jwt";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user? : {
                email : string;
                name : string;
                id :string;
                role : Role;
            }
        }
    }
}

router.post("/register", userController.registerUser);

router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const { email, name, id, role } = verifiedToken;

    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    if (!requiredRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Forbidden Route!!",
      });
    }
     

    req.user = {
        email , name , id , role
    }

    next();
  },
  userController.getMyProfile,
);

export const userRoutes = router;
