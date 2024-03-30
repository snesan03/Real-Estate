import express from 'express'
import { deleteUser, getUser, test, updateUser } from '../controller/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const route=express.Router();

route.get('/test',test)
route.post('/update/:id',verifyUser,updateUser)
route.delete('/delete/:id',verifyUser,deleteUser)
route.get('/:id',verifyUser,getUser)


export default route;