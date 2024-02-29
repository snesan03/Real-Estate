import React from 'react'
import {GoogleAuthProvider, getAuth,signInWithPopup}  from 'firebase/auth'
import { app } from '../firebase/auth'
import {  useDispatch } from 'react-redux'
import { signInStart, signInSuccess } from '../../redux/user/userSlice'
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
const handleGoogleOauth= async()=>{
  
  
  try {
    const provider=new GoogleAuthProvider()
  const auth=getAuth(app)

    const result= await signInWithPopup(auth,provider);
    console.log(result)
    // dispatch(signInStart())
      
      const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(
          {user:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL})
      })
      
      const data=await res.json()
      console.log(data)
      dispatch(signInSuccess(data))
      navigate('/')
    
  } catch (error) {
    console.log("could not signin with google",error)
  }

}


  return (
    <button type='button' className='bg-red-600 p-3 rounded-lg  text-white uppercase' onClick={handleGoogleOauth}>Continue with Google</button>
  )
}
