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