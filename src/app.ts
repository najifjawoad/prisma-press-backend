import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { premiumRoutes } from "./modules/premium/premium.route";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
import { userRoutes } from "./modules/users/users.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/posts/post.router";
import { commentRoutes } from "./modules/comments/comments.route";



const app : Application = express();

app.use(cors({
    origin : config.app_url,
    credentials : true,
}))

const endpointSecret = config.stripe_webhook_secret;



app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }))

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


app.get("/",(req : Request, res : Response) => {
    res.send("Hello, World!");
});



app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/subscription", subscriptionRoutes)
app.use("/api/premium", premiumRoutes)




app.use(notFound)


app.use(globalErrorHandler)

export default app;