import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Oauth from '../components/Oauth'

export default function SignUp() {
  const [formdata,setformdata]=useState({})
  const [loadstate,setloadstate]=useState(false)
  const [error,seterror]=useState(null)
  const navigate=useNavigate()
  const updateForm=(e)=>{
    setformdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
    console.log(formdata)
    

  }
  const savedata=async(e)=>{
    try{
      e.preventDefault()
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formdata)
      })
      setloadstate(true)
      console.log(data)
      const data=await res.json()
      console.log(data)
      if(data.success==false){
        setloadstate(false)
        seterror(data.message)
        return
        
      }
      setloadstate(false)
      seterror(null)
      navigate('/signin')

    }
    catch(err){
      setloadstate(false);
      seterror(error.message)
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-bold text-lg py-4'>SignUp</h1>
      <form className='flex flex-col  gap-4 '>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={updateForm}></input>
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={updateForm}></input>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={updateForm}></input>
        <button disabled={loadstate} className='bg-slate-700 text-white rounded-lg hover:opacity-85 disabled:opacity-50 p-3 uppercase' onClick={savedata}>
        {!loadstate && "Sign Up"} {loadstate && "Loading...."} </button>
        <Oauth/>
      </form>

    <div className='flex gap-2 pt-2.5'>
      Have an account?
      <Link to={'/signin'}>
      <span className='text-blue-700 hover:underline'>
        sign in
      </span>
      </Link>
    </div>
    {error && <p className='text-red-600'>
      
      {error}

    </p>}
    
    
    
    </div>
  )
}
