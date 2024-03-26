import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing, createUserListing, deleteUserListing } from "../controller/list.controller.js";

const route=express.Router()

route.post('/createlist',verifyUser,createListing)
route.get('/userlisting/:id',verifyUser,createUserListing)
route.delete('/delete/:id',verifyUser,deleteUserListing)


export default route;

