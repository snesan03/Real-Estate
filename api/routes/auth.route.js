import express from 'express'
import {signup} from '../controller/auth.controller.js'

const route=express.Router()

const auth=route.post('/signup',signup)

export default auth;
