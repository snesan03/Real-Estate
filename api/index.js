import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './routes/user.route.js'
import auth from './routes/auth.route.js'


dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MogoDB is connected")
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.listen(3000,()=>{
    console.log("local host is running on port 3000!!!")
})

app.use(express.json());

app.use('/api/user',user);

app.use('/api/auth',auth);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server error"
     return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})