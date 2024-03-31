import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing, createUserListing, deleteUserListing, getListing, searchList, updateListing } from "../controller/list.controller.js";

const route=express.Router()

route.post('/createlist',verifyUser,createListing)
route.get('/userlisting/:id',verifyUser,createUserListing)
route.delete('/delete/:id',verifyUser,deleteUserListing)
route.post('/update/:id',verifyUser,updateListing)
route.get('/get/:id',getListing)
route.get('/get',searchList)


export default route;

