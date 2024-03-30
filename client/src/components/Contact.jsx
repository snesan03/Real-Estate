import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [Landlord,setLondlord]=useState(null)
    const [message,setMessage]=useState("")
    console.log(Landlord);

    useEffect(()=>{
        const fetchUser=async()=>{
            const res=await fetch(`/api/user/${listing.userRef}`)
            const data=await res.json()
            if(data.success===false){
                console.log(data.message);
                return
            }
            setLondlord(data)
        }
        fetchUser()
    },[listing.userRef])

    const handleMessageChange=(e)=>{
        setMessage(e.target.value)
        console.log(message);
        
    }
  return (
    <main>
    {Landlord && (<div className='flex flex-col gap-2'>    
        <div>
        <p>Contact <span className='font-semibold'>{Landlord.username}</span > for <span className='font-semibold'>{listing.name}</span></p>
        </div>
            <textarea value={message} placeholder='Enter your text here' 
            name='message' id='message'
            className='w-full border p-3 rounded-lg' 
            onChange={(e)=>handleMessageChange(e)}>

            </textarea>
            <Link
          to={`mailto:${Landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
    </div>
        )}
        </main>

  )
}
