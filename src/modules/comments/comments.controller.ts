import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
})

const getCommentsByAuthorId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
})


const getCommentsByCommentId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
})

const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     
})

const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {       

})

const moderateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

})



export const commentController = {
    createComment,
    getCommentsByAuthorId,
    getCommentsByCommentId,
    updateComment,
    deleteComment,
    moderateComment
}
