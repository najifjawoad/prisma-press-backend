import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import { userRoutes } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/posts/post.router";
import { commentRoutes } from "./modules/comments/comments.route";
import { notFound } from "./middlewares/notFound";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello JIM");
});

app.use("/api/users" , userRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/posts" , postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/subscription" , subscriptionRoutes);

// For unknown routes :
app.use(notFound);


// For global error handling :
app.use(globalErrorHandler);

export default app;
