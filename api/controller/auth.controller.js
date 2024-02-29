import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorGenerator } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup=async (req,res,next)=>{
    // console.log(req.body);
    const {username,email,password}=req.body;
    const secPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:secPassword});
    try{
        await newUser.save()
        res.status(201).json("User is created")

    }
    catch(err){
        next(err) 
    }
}

export const signin=async(req,res,next)=>{
    const {email,password}= req.body;
    try{
        const validUser=await User.findOne({email})
        if(!validUser){return next(errorGenerator(404,"User not found"))}
        const validPassword=bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){return next(errorGenerator(401,"Wrong Credentials!"))}
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_TOKEN)
        const {password:pass,...rest}=validUser._doc
        res.cookie('Access_token',token,{httpOnly:true}).status(200).json(rest)
        

    }
    catch(err){
        next(err)
    }

}

export const google=async(req,res,next)=>{

    try {
        const {user,email,photo}=req.body
        const validUser=await User.findOne({email})

        
        if(validUser){
            const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_TOKEN)
            const {password:pass,...rest}=validUser._doc
            res.cookie('Access_token',token,{httpOnly:true}).status(200).json(rest)
        }
        else{
            const username=user.split(" ").join("").toLowerCase()+Math.random().toString(32).slice(-4);
            const password=Math.random().toString(32).slice(-8)+Math.random().toString(32).slice(-8);
            const secPassword=bcryptjs.hashSync(password,10);
            const newUser=new User({username,email,password:secPassword,photo:photo});
            console.log(newUser);
                await newUser.save()
                const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_TOKEN)
                const {password:pass,...rest}=validUser._doc
                res.cookie('Access_token',token,{httpOnly:true}).status(200).json(rest)

            
          
        }



    } catch (error) {
        next(error)
    }

}