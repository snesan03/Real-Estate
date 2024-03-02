import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../firebase/auth'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

export default function Profile() {
  const {currentuser}=useSelector((state)=>state.user)
  const imageRef=useRef(null)
  const [image,setImage]=useState(null)
  const [imagePerc,setImagePerc]=useState(null)
  const [imError,SetImError]=useState(null)
  const [formdata,setFormData]=useState({})
  console.log(formdata)
  useEffect(()=>{
    if(image){
      uploadFile(image)
    }
  },[image])
  const uploadFile=(image)=>{
    const storage=getStorage(app);
    const filename=new Date().getTime() +image.name;
    const storageRef=ref(storage,filename)
    SetImError(null)
    const imageUpload=uploadBytesResumable(storageRef,image)
    imageUpload.on('state_changed',
    (snapshot)=>{
      const percentage=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
      console.log(percentage)

      setImagePerc(percentage)

    },
    (errror)=>{
      console.log(errror)
      SetImError(errror)
    },
    ()=>{
      getDownloadURL(imageUpload.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formdata,avatar:downloadUrl})
      })
    }
    
    )

  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-bold text-center p-3'>Profile</h1>
      <form className='flex flex-col gap-3 pt-3'>
        <input type='file' hidden  ref={imageRef} onChange={(e)=>setImage(e.target.files[0])} accept='image/*'></input>
        <img src={ formdata.avatar || currentuser.photo} onClick={()=>{imageRef.current.click()}} 
        className='h-24 w-24 rounded-full object-cover self-center cursor-pointer'/>
        {imagePerc  && imagePerc!==100 ? <span className='text-center'>{`Uploaded ${imagePerc} percentage`} </span> : 
        <span className='text-red-600 text-center'>{ imError && ` upload image less than 2mb`}</span>}
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
