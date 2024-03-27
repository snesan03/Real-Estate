import Listing from "../model/list.model.js"
import { errorGenerator } from "../utils/error.js"


export const createListing=async (req,res,next)=>{
    try {
        const newListing=new Listing(req.body)
        await newListing.save()
        res.status(201).json(newListing)
        
    } catch (error) {
        next(error)
    }

}

export const createUserListing=async (req,res,next)=>{
    try {
        if(req.user.id===req.params.id){
            const listing=await Listing.find({userRef:req.params.id})
            res.status(201).json(listing)
        }
        else{
            return next(errorGenerator(401,"You can only access your own list"))
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUserListing=async(req,res,next)=>{
    
        const listing=await Listing.findById(req.params.id)
        if(!listing){
            return next(errorGenerator(404,"List Not found"))
        }
        if(req.user.id!==listing.userRef){
            return next(errorGenerator(401,"You can only delete your own list"))
        }
   try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("The Listing has been deleted")
   } catch (error) {
    next(error)
   }
}

export const updateListing=async (req,res,next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorGenerator(404,"List Not found"))
    }
    if(req.user.id!==listing.userRef){
        return next(errorGenerator(401,"You can only update your own list"))
    }
try {
const updatedList=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(200).json(updatedList)
} catch (error) {
next(error)
}
}

export const getListing=async(req,res,next)=>{
    try {
        const list=await Listing.findById(req.params.id)
        res.status(201).json(list)
    } catch (error) {
        next(error)
    }
}