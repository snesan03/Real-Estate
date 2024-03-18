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