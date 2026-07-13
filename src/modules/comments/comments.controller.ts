import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";
import { commentService } from "./comments.service";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
    const authorId = req.user?.id as string;
    const payload = req.body;

    const result = await commentService.createComment(authorId , payload);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Comment created successfully",
        data : result
    })
})

const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {authorId} = req.params;

    const result  = await commentService.getCommentByAuthorId(authorId as string);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Comments fetched successfully",
        data : result
    })
     
})


const getCommentsByPostId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {postId} = req.params;

    const result  = await commentService.getCommentByPostId(postId as string);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Comments fetched successfully",
        data : result
    })
     
})

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
    const {commentId} = req.params;
    const authorId = req.user?.id as string;
    const payload = req.body;
    const result = await commentService.updateComment(commentId as string , payload , authorId) ;

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK, 
        message : "Comment updated successfully",
        data : result
    })


})

const deleteComment = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const result = await commentService.deleteComment(commentId as string, authorId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment deleted successfully",
        data: result
    })
})

const moderateComment = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const { commentId } = req.params;
    const payload = req.body;
    const result = await commentService.moderateComment(commentId as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment moderated successfully",
        data: result
    });
})


export const commentController = {
    createComment,
    getCommentsByAuthorId,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    moderateComment
}
