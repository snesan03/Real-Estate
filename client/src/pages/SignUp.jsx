import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [formdata,setformdata]=useState({})
  const updateForm=(e)=>{
    setformdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
    // console.log(formdata)
    

  }
  const savedata=async()=>{
      const response=await fetch('/api/auth/signup',{
        method:post,
        body:JSON.stringify(formdata)
      })
      console.log(response);

  }
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-bold text-lg py-4'>SignUp</h1>
      <form className='flex flex-col  gap-4 '>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'></input>
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email'></input>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password'></input>
        <button  className='bg-slate-700 text-white rounded-lg hover:opacity-85 disabled:opacity-50 p-3 uppercase'>Sign Up</button>
      </form>

    <div className='flex gap-2 pt-2.5'>
      New user?
      <Link to={'/sign-in'}>
      <span className='text-blue-700 hover:underline'>
        sign in
      </span>
      </Link>
    </div>
    
    
    
    </div>
  )
}
