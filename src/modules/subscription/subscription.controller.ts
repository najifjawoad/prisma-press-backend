import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { subscriptionService } from "./subscription.service";
import { sendResponse } from "../../utilities/sendResponse";
import  httpStatus  from "http-status";

const createCheckoutSession = catchAsync(
    async(req : Request , res : Response , next : NextFunction) =>{

        const userId = req.user?.id;
        const result = await subscriptionService.createCheckoutSession(userId as string);
        
       sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Checkout completed successfully",
        data : result,
       })


    }
)

const handleWebHook = catchAsync(
    async(req : Request , res : Response , next : NextFunction) =>{

        const event = req.body as Buffer;
        const signature = req.headers['stripe-signature']!
       await subscriptionService.handleWebHook(event , signature as string);
      sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Webhook triggered successfully",
        data : null
      })

    }
)


export const subscriptionController = {
    createCheckoutSession,
    handleWebHook

}