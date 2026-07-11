import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comments.controller";

const router = Router();


router.post("/", auth(Role.USER, Role.ADMIN , Role.AUTHOR) , commentController.createComment);

router.get("/author/:authorId",  commentController.getCommentsByAuthorId);

router.get("/:commentId",  commentController.getCommentsByCommentId);

router.patch("/:commentId", auth(Role.USER, Role.ADMIN , Role.AUTHOR) , commentController.updateComment);

router.delete("/:commentId", auth(Role.USER, Role.ADMIN , Role.AUTHOR) , commentController.deleteComment);


router.put("/:commentId/moderate", auth(Role.ADMIN) , commentController.moderateComment);



export const commentRoutes = router;