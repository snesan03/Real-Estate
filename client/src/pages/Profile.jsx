import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentuser}=useSelector((state)=>state.user)
  console.log(currentuser)
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-bold text-center p-3'>Profile</h1>
      <form className='flex flex-col gap-3 pt-3'>
        <img src={currentuser.photo} className='h-24 w-24 rounded-full object-cover self-center'/>
        <input type='text' placeholder='username' id='username' className='rounded-lg p-3 border'></input>
        <input type='text' placeholder='email' id='email' className='rounded-lg p-3 border'></input>
        <input type='text' placeholder='password' id='password' className='rounded-lg p-3 border'></input>
        <button  className='bg-blue-900 text-white rounded-lg p-2 cursor-pointer hover:opacity-85 disabled:opacity-65'>Update</button>
      </form>
      <div className='flex justify-between'> 
        <span className='text-red-600 curser-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
      
    </div>
  )
}
