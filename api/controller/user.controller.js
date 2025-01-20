import Listing from "../model/list.model.js"
import User from "../model/user.model.js"
import { errorGenerator } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.send("Testing Testing ???")
}

export const updateUser= async (req,res,next)=>{
    if(req.user.id!==req.params.id){ return next(errorGenerator(401,"You can only update your profile"))}
    
    try {
        
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }

        const data=await User.findByIdAndUpdate(req.params.id,
        {
            $set:{
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                photo: req.body.photo

            }

        },{new:true})

        const {password,...rest}=data._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}


export const deleteUser= async (req,res,next)=>{
    try {
        if(req.user.id!==req.params.id){return next(errorGenerator(401,"You can only delete your own account!"))}

        const data=await User.findByIdAndDelete(req.params.id)
        const data1=await Listing.deleteMany(
            {
                userRef: req.params.id
            })
        res.clearCookie("Access_token")
        res.status(200).json("User has been deleted")

    } catch (error) {

        
        next(error)
    }
}

export const getUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user){
            return next(errorGenerator(404,"User not Found"))
        }

        const {password,...rest}=user._doc;
        res.status(201).json(rest);

    } catch (error) {
        next(error)
    }
}