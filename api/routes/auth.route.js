import express from 'express'
import {signup} from '../controller/auth.controller.js'

const route=express.Router()

const auth=route.post('/singup',signup)

export default auth;
