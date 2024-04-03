import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
export default function Search() {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    const [listings,setListings]=useState({})
    // console.log(listings);
    useEffect(()=>{
        const urlparam =new URLSearchParams(location.search)
        const searchTerm=urlparam.get("searchTerm")
        const parking=urlparam.get("parking")
        const type=urlparam.get("type")
        const furnished=urlparam.get("furnished")
        const order=urlparam.get("order")
        const sort=urlparam.get("sort")
        
        if(searchTerm || parking || type || furnished || order || sort){
            setSearchData({
                searchTerm: searchTerm || '',
        type: type || 'all',
        parking: parking === 'true' ? true : false,
        furnished: furnished === 'true' ? true : false,
        
        sort: sort || 'created_at',
        order: order || 'desc',
            })
        }

        const fetchListings=async()=>{
            setLoading(true)
            const searchQuery=urlparam.toString()
            try {
            const res=await fetch(`api/list/get?${searchQuery}`)
            const data=await res.json()
            if(data.success===false){
                setError(data.message)
                setLoading(false)
                console.log(data.message)
                return
            }
            setListings(data)
            setLoading(false)
            
            } catch (error) {
                setError(error.message)
                console.log(error.message);
                setLoading(false)
            }
            
        }
        fetchListings();
    },[location.search])

    const navigate=useNavigate()
    const [searchData,setSearchData]=useState({
        searchTerm:"",
        type:"all",
        parking:false,
        furnished:false,
        sort:"createdAt",
        order:"desc"
    })
    // console.log(searchData);

    const handleChange=(e)=>{
        if(e.target.id==="searchTerm"){
            setSearchData({...searchData,searchTerm:e.target.value})
        }
        if(e.target.id==="all" || e.target.id==="rent" || e.target.id==="sale"){
            setSearchData({...searchData,type:e.target.id})
        }
        if(e.target.id==="parking" || e.target.id==="furnished"){
            setSearchData({...searchData,[e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id==="sort"){
            const sort=e.target.value.split("_")[0] || "createdAt";
            const order=e.target.value.split("_")[1] || "desc";
            setSearchData({...searchData,sort:sort,order:order})

        }
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlparam =new URLSearchParams()
        urlparam.set("searchTerm",searchData.searchTerm)
        urlparam.set("parking",searchData.parking)
        urlparam.set("type",searchData.type)
        urlparam.set("furnished",searchData.furnished)
        urlparam.set("order",searchData.order)
        urlparam.set("sort",searchData.sort)
        const searchQuery=urlparam.toString();
        navigate(`/search?${searchQuery}`)
        
    }
  return (
    <div className='flex flex-col gap-3  p-3 md:flex-row '>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <div className=' flex flex-row gap-2 items-center'>
                <p className='font-semibold'>Search Term:</p>
                <input onChange={handleChange} value={searchData.searchTerm} className='border p-2 rounded-lg' type='text'placeholder='Search...' id='searchTerm'></input>
            </div>
            <div className="flex flex-row gap-3 items-center ">
                <p className='font-semibold'>Type:</p>
                <div className="flex flex-row gap-2 items-center">
                <input onChange={handleChange} type='checkbox' id='all'
                checked={searchData.type==="all"}></input>
                Rent & Sale
                </div>
                <div className="flex flex-row gap-2 items-center">
                <input type='checkbox' id='rent' onChange={handleChange}
                checked={searchData.type==="rent"}></input>
                Rent
                </div>
                <div className="flex flex-row gap-2 items-center">
                <input type='checkbox' id='sale' onChange={handleChange}
                checked={searchData.type==="sale"}></input>
                Sale
                </div>
                
            </div>
            <div className="flex flex-row gap-3 items-center ">
                <p className='font-semibold'>Amenities:</p>
                
                <div className="flex flex-row gap-2 items-center">
                <input type='checkbox' id='parking' onChange={handleChange}
                checked={searchData.parking===true}></input>
                Parking
                </div>
                <div className="flex flex-row gap-2 items-center">
                <input type='checkbox' id='furnished' onChange={handleChange}
                checked={searchData.furnished===true}></input>
                Furnished
                </div>
                
            </div>
            <div className="flex flex-row gap-3 items-center ">
                <p className='font-semibold'>Sort:</p>
                <select defaultValue={"regularPrice_asc"} id='sort' 
                className='p-2 border rounded-lg' onChange={handleChange}>
                    <option value={"regularPrice_asc"}>Price low to high</option>
                    <option value={"regularPrice_desc"}>Price high to low</option>
                    <option  value={"created_desc"}>Oldest</option>
                    <option value={"created_asc"}>Latest</option>
                </select>
            </div>

            <button className='bg-slate-700 text-white p-3 rounded-lg'>Search</button>
            
        </form>

        <div className="text-2xl font-bold">
            Listings Results:
        </div>
    </div>
  )
}
