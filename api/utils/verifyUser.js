import  jwt  from "jsonwebtoken"

import { errorGenerator } from "./error.js";

export const verifyUser=(req,res,next)=>{
    const token=req.cookies.Access_token;

    if(!token){ return next(errorGenerator(401,"Unauthorised Access"))}

    jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
        if(err){return  next(errorGenerator(404,"Forbidden"))}

        req.user=user;
        next()
    })
}