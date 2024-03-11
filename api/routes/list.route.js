import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing } from "../controller/list.controller.js";

const route=express.Router()

route.post('/createlist',verifyUser,createListing)

export default route;

