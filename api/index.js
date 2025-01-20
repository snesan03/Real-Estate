import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import user from './routes/user.route.js'
import auth from './routes/auth.route.js'
import List from './routes/list.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'


dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MogoDB is connected")
}).catch((err)=>{
    console.log(err)
})

const __dirname = path.resolve();

const app=express()


app.listen(3000,()=>{
    console.log("local host is running on port 3000!!!")
})

app.use(express.json());
app.use(cookieParser())

app.use('/api/user',user);

app.use('/api/auth',auth);

app.use('/api/list',List)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server error"
    
     return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})