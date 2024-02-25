import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './routes/user.route.js'

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

app.use('/api/user',user);