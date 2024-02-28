import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignInFail,signInStart,signInSuccess } from '../../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'


export default function SignIn() {
  const [formdata,setformdata]=useState({})
  const { loadstate, error } = useSelector((state) => state.user);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const updateForm=(e)=>{
    setformdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
    console.log(formdata)
    

  }
  const validateData=async(e)=>{
    e.preventDefault()
    try{
      dispatch(signInStart())
      
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formdata)
      })
      
      const data=await res.json()
      console.log(data)
      if(data.success==false){
        dispatch(SignInFail(data.message))
        return
        
      }
      dispatch(signInSuccess(data))
      navigate('/')

    }
    catch(err){
      dispatch(SignInFail(err.message))
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-bold text-lg py-4'>Sign In</h1>
      <form className='flex flex-col  gap-4 '>
       
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={updateForm} ></input>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={updateForm}></input>
        <button disabled={loadstate} className='bg-slate-700 text-white rounded-lg hover:opacity-85 disabled:opacity-50 p-3 uppercase' onClick={validateData}>
        {!loadstate? "Sign In":"Loading...."} </button>
      </form>

    <div className='flex gap-2 pt-2.5'>
      New user?
      <Link to={'/signup'}>
      <span className='text-blue-700 hover:underline'>
        sign up
      </span>
      </Link>
    </div>
   
    {error && <p className='text-red-600'>
      
      {error}

    </p>}
    
    
    
    </div>
  )
}
