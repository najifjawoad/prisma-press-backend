import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utilities/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const id  = req.user?.id ;
    const payload = req.body;

    const result = await postService.createPost(payload , id as string);

    sendResponse(res , {
        
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Post created successfully",
        data : result
    })

})

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

const result = await postService.getAllPosts();

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Posts fetched successfully",
        data : result
    })
     
})

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id as string;
    const result = await postService.getMyPosts(authorId);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Posts fetched successfully",
        data : result
    })

})

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const postId = req.params.postId;
    if(!postId){
       throw new Error("Post id is required in params");
    }
    const result = await postService.getPostById(postId as string);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK, 
        message : "Post fetched successfully",
        data : result
    })
    
})

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id as string;
    const IsAdmin = req.user?.role === "ADMIN" ? true : false;
    const postId = req.params.postId;
    const payload = req.body;

    const result = await postService.updatePost(postId as string, payload, authorId, IsAdmin);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post updated successfully",
        data : result
    })
    
})

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId = req.user?.id as string;
    const IsAdmin = req.user?.role === "ADMIN" ? true : false;
    const postId = req.params.postId;

    if(!postId){
        throw new Error("Post id is required in params");
    }

     await postService.deletePost(postId as string, authorId, IsAdmin);

    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post deleted successfully",
        data : null
    })
    
})

const getPostsStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   

    const result = await postService.getPostStatus();
        sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post stats retrieved successfully",
        data : result
    })


})

export const postController = {
    createPost,
    getAllPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
}
