import User from "../model/user.model.js";
import bcrypt from 'bcrypt'
import { errorGenerator } from "../utils/error.js";

export const signup=async (req,res,next)=>{
    // console.log(req.body);
    const {username,email,password}=req.body;
    const secPassword=bcrypt.hashSync(password,10)
    const newUser=new User({username,email,password:secPassword});
    try{
        await newUser.save()
        res.status(201).json("User is created")

    }
    catch(err){
        next(err) 
    }
}