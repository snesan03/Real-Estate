import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../firebase/auth'
import { Link } from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {  updateFail,updateStart,updateSuccess,deleteFail,deleteStart,deleteSuccess,signOutStart,signOutFail,signOutSuccess } from '../../redux/user/userSlice'



export default function Profile() {
  const {currentuser,loadstate,error}=useSelector((state)=>state.user)
  const imageRef=useRef(null)
  const [image,setImage]=useState(null)
  const [imagePerc,setImagePerc]=useState(null)
  const [imError,SetImError]=useState(null)
  const [formdata,setFormData]=useState({})
  const [isSuccess,setSuccess]=useState(false)
  const [listingError,setListingError]=useState(false)
  const [listings,setListings]=useState([])
  const dispatch=useDispatch()
  // console.log(formdata)
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
      // console.log(percentage)

      setImagePerc(percentage)

    },
    (errror)=>{
      // console.log(errror)
      SetImError(errror)
    },
    ()=>{
      getDownloadURL(imageUpload.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formdata,photo:downloadUrl})
      })
    }
    
    )
   

  }
  const handleChange=(e)=>{
    setFormData({...formdata,[e.target.id]:e.target.value})
  }
  const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
          dispatch(updateStart())
          console.log(currentuser)
          const res=await fetch(`/api/user/update/${currentuser._id}`,{
            method:'post',
            headers:{
              "Content-type":"Application/json"
            },
            body:JSON.stringify(formdata)
          })
          const data=await res.json()
          console.log(data)
          if(data.success===false){
            dispatch(updateFail(data.message))
            return;
          }
          dispatch(updateSuccess(data))
          setSuccess(true)


          
        } catch (error) {
          dispatch(updateFail(error.message))
        }
  }

  const handleDeleteUser=async()=>{
    try {
      dispatch(deleteStart())
      const res=await fetch(`/api/user/delete/${currentuser._id}`,{
        method:"delete"
      })
      const data=await res.json()
      console.log(data)
      if(data.success===false){
        dispatch(deleteFail(data.message))
        return
      }
      dispatch(deleteSuccess())
      
    } catch (error) {
      dispatch(deleteFail(error.message))
    }
  }

  const handleSignOut= async()=>{
    try {
        dispatch(signOutStart())
        const res=await fetch('/api/auth/signout')
        const data=await res.json()
        console.log(data)
        if(data.success==false){
          dispatch(signOutFail(data.message))
          return
        }
        dispatch(signOutSuccess())
    } catch (error) {
      dispatch(signOutFail(error.message))
    }
  }
  const handleShowListing=async()=>{
      try {
        const res=await fetch(`/api/list/userlisting/${currentuser._id}`,{
          method:'GET',
          'content-type':'Application/json'
        })
        const data=await res.json()
        console.log(data)
        return setListings(data)
      } catch (error) {
        setListingError(error.message)
      }
  }
  const handleDeleteListing= async(listingId)=>{
    try {
      const res=await fetch(`/api/list/delete/${listingId}`,{
        method:"Delete"
      })
      const data=await res.json()
      console.log(data)
      if(data.success===false){
        setListingError(data.message)
        return
      }
      
        setListings((prev)=>prev.filter((listings)=>{return listings._id!==listingId}))
        
      
    } catch (error) {
      setListingError(error.message)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-bold text-center p-3'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-3 pt-3'>
        <input type='file' hidden  ref={imageRef} onChange={(e)=>setImage(e.target.files[0])} accept='image/*'></input>
        <img src={ formdata.photo || currentuser.photo} onClick={()=>{imageRef.current.click()}} 
        className='h-24 w-24 rounded-full object-cover self-center cursor-pointer'/>
        {imagePerc  && imagePerc!==100 ? <span className='text-center'>{`Uploaded ${imagePerc} percentage`} </span> : 
        <span className='text-red-600 text-center'>{ imError && ` upload image less than 2mb`}</span>}
        <input type='text'onChange={handleChange} defaultValue={currentuser.username} placeholder='username' id='username' className='rounded-lg p-3 border'></input>
        <input type='text'onChange={handleChange} defaultValue={currentuser.email} placeholder='email' id='email' className='rounded-lg p-3 border'></input>
        <input type='password'onChange={handleChange} placeholder='password' id='password' className='rounded-lg p-3 border'></input>
        <button disabled={loadstate} className='bg-blue-900 text-white rounded-lg p-2 cursor-pointer hover:opacity-85 disabled:opacity-65'>
           {loadstate? "loading..." :"Update"}</button>
        <Link to={'/createlist'} className='bg-blue-900 p-2 rounded-lg text-white text-center cursor-pointer hover:opacity-80'>Create Listing</Link>
      </form>
      <div className='flex justify-between'> 
        <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
      {error && <span className='text-red-700'>{ error}</span>}
      {isSuccess && <span className='text-green-600'>Updated Successfullly</span>}
      <p onClick={handleShowListing} className='mt-4 text-center text-green-500 hover:underline cursor-pointer'>Show listing</p>
      {listingError && <p className='text-red-500 text-center'>{listingError}</p>}
      {listings && listings.length>0 && 
      <div className='flex flex-col gap-2'>
        <h1 className='text-center mt-7 font-semibold text-3xl'>Your Listing</h1>{
      listings.map((listing)=>(
        
          <div className='flex flex-row gap-9 justify-between items-center' key={listing._id}>
            
            
            <Link  to={`listing/${listing._id}`}>
              <img className='h-20 w-20 object-contain rounded-lg' alt={listing.name} src={listing.imageUrls[0]}></img>
            </Link>
            <Link to={`listing/${listing._id}`} className='flex-1 hover:underline truncate'>
            <p>
              {listing.name}
            </p>
            
            </Link>
            
            
              <div className='flex flex-col justify-around'>
                <p onClick={()=>handleDeleteListing(listing._id)} className='text-red-600 hover:cursor-pointer'>Delete</p>
                <Link to= {`/updateList/${listing._id}`}>
                <p className='text-red-600'>edit</p>
                </Link>
              </div>
          </div>
          

      ))}
      </div>}
      
    </div>
  )
}
