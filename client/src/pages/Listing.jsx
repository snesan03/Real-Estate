import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams()
    const [listing,setListing]=useState(null)
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
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
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p>{error.message}</p>}
        {listing && !loading && !error && (
        <div>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                <SwiperSlide key={url}>
                    <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>

                </SwiperSlide>)
                
                )}
            </Swiper>
        </div>)}


    
    
    </main>
  )
}
