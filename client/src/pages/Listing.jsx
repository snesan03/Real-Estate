import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams()
    const {currentuser}=useSelector((state)=>state.user)    
    const [listing,setListing]=useState(null)
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const [copied,setCopied]=useState(false)
    const [contact,setContact]=useState(false)
    console.log(currentuser,listing);
    useEffect(()=>{
        const fetchListing=async()=>{
            setLoading(true)
            try {
                const res=await fetch(`/api/list/get/${params.listingId}`)
                const data=await res.json()
                console.log(data);
                if(data.success===false){
                    setError(error.message)
                    setLoading(false)
                    return
                }
                setListing(data)
                console.log(listing)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
            
            


        }
        fetchListing();
    },[params.listingId])
  return (
    <main >
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p>{error.message}</p>}
        {listing && !loading && !error && (
        <div>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                <SwiperSlide key={url}>
                    <div
                  className='h-[400px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>

                </SwiperSlide>)
                
                )}
            </Swiper>
        </div>)}
        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
        <p className='text-center font-bold text-4xl p-3'>{listing && listing.name}</p>
        {listing && ( <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col gap-3'>
            <p className='flex gap-2  text-green-600 p-3 items-center'>
                <FaMapMarkerAlt className='text-green-600'></FaMapMarkerAlt>
                {listing && listing.address}
            </p>

            <div className='flex gap-3 p-2'>
                <button className='bg-red-800 p-3 rounded-md w-full max-w-[200px] text-center text-white'>
                    {listing && (listing.type==="rent"?"For Rent":"For Selling")}
                </button>
                <button className='bg-green-800 p-3 rounded-md w-full max-w-[200px] text-center text-white'>
                    ${listing && (listing.regularPrice-listing.discountPrice)+ " "} 
                </button>
                
            </div>

            <p className='p-3'>
               <span className='font-semibold'> Description </span>- {listing && listing.description}
            </p>
        <div className='flex flex-row gap-3 text-green-600 p-3 flex-wrap'>
            <div className='flex flex-row gap-2  items-center'>
            <FaBath></FaBath>
            <p>{listing.bathrooms+" "}baths</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
            <FaBed></FaBed>
            <p>{listing.bedrooms+' '}beds</p>
            </div>
            <div className='flex flex-row gap-2  items-center'>
            <FaParking></FaParking>
            <p>{(listing.parking?"parking":"No Parking")}</p>
            </div>
            <div className='flex flex-row gap-2 items-center'>
            <FaChair></FaChair>
            <p>{(listing.furnished ? "Furnished":"Not Furnished")}</p>
            </div>
        </div>
        {currentuser && !contact && listing && listing.userRef!==currentuser._id && (
            <button onClick={()=>setContact(true)} className='bg-blue-800 p-3 rounded-lg text-white'>
                Contact Landlord
            </button>
        )}
        {contact && <Contact listing={listing}></Contact>}
        
        </div>
        
        
        </div>)}


    
    
    </main>
  )
}
