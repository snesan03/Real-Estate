import express from 'express'
import { test } from '../controller/user.controller.js';

const route=express.Router();

const user =route.get('/test',test)

export default user;