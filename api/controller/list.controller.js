import Listing from "../model/list.model.js"


export const createListing=async (req,res,next)=>{
    try {
        const newListing=new Listing(req.body)
        await newListing.save()
        res.status(201).json(newListing)
        
    } catch (error) {
        next(error)
    }

}