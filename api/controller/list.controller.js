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

export const searchList=async(req,res,next)=>{
    try {
        const limit=parseInt(req.query.limit)||9;
        const startIndex=parseInt(req.query.startIndex)||0;
        const searchTerm=req.query.searchTerm||"";
        let type=req.query.type;
        if(type===undefined || type==="all"){
            type={$in:["rent","sale"]}
        }
        let offer=req.query.offer||"false";
        if(offer===undefined || offer===false){
            offer={$in:[true,false]}
        }
        let furnished=req.query.furnished||"false";
        if(furnished===undefined || furnished==="false"){
            furnished={$in:[true,false]}
        }
        let parking=req.query.parking||"false";
        if(parking===undefined || parking==="false"){
            parking={$in:[true,false]}
        }
        const sort=req.query.sort||"createdAt";
        const order=req.query.order||"desc"

        const listing=await Listing.find({
            name:{$regex:searchTerm,$options:'i'},
            type,
            offer,
            parking,
            furnished,
    }).sort({[sort]:order}).limit(limit).skip(startIndex)
    res.status(200).json(listing)

    } catch (error) {
        next(error)
    }
}