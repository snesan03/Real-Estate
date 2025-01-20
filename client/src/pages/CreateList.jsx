import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function CreateList() {
    const [image,setImage]=useState([])
    const [submitloading,setsubmitloading]=useState(false)
    const {currentuser}=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const [formdata,setFormData]=useState({
        imageUrls:[],
         name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 1000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    })
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    
    
    const hadleUploadImages=(e)=>{
        
        if(image.length>0 && image.length<7){
            setError(false)
        setLoading(true)
            const promises=[]
            for(let i=0;i<image.length;i++){
                promises.push(storeImage(image[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({
                    ...formdata,imageUrls:formdata.imageUrls.concat(urls)
                })
                console.log(formdata.imageUrls)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err.message)
                console.log(err)
                setLoading(false)
            })
            
            
        }
        else{
            setError("You can Upload only minimum of 1 images and maximum of 6 images")
            setLoading(false)
        }
        // setLoading(false)
        console.log(formdata.imageUrls)
    }
    const storeImage=async(im)=>{
        return new Promise((resolve,reject)=>{
            
            const storage=getStorage(app)
            const filename=new Date().getTime()+im.name 
            
            const storageRef=ref(storage,filename)
            const imageUpload=uploadBytesResumable(storageRef,im)
            imageUpload.on('state_changed',
            (snapshot)=>{
                const percentage=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                console.log(percentage)
            },
            (error)=>{
                reject(error)
                
            },
            ()=>{
                getDownloadURL(imageUpload.snapshot.ref).then((downloadUrl)=>{
                    resolve(downloadUrl)
                })
            }
        
            
            )


        })
    }
    const handleRemoveImage = (index) => {
        setFormData({
          ...formdata,
          imageUrls: formdata.imageUrls.filter((_, i) => i !== index),
        });
      };
      const handlechange=(e)=>{
            if(e.target.id==="sale" || e.target.id==="rent"){
                setFormData({
                    ...formdata,
                    type:e.target.id,
                })
            }
            if(e.target.id==="parking" || e.target.id==="furnished" ||e.target.id==="offer"){
                setFormData({
                    ...formdata,
                    [e.target.id]:e.target.checked,
                })
            }
            if(e.target.type==="text" || e.target.type==="textarea" || e.target.type==="number"){
                setFormData({
                    ...formdata,
                    [e.target.id]:e.target.value
                })
            }
            
      }
      const handlesumbmit=async(e)=>{
        e.preventDefault()
        if(formdata.imageUrls.length<=0){
            return setError("Atleast select one image")
            
        }
        if(+formdata.discountPrice>+formdata.regularPrice){
            return setError("Discounted price cannot be greater than regular price")
            
        }
        
        
        setsubmitloading(true)
        try {

            const res=await fetch('/api/list/createlist', {
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify({...formdata,userRef:currentuser._id})
                },
                
                )
                const data=await res.json();
                console.log(data)
                if(data.success===false){
                    setError(data.message)
                    setsubmitloading(false)
                    console.log(data)
                }
                navigate(`/listing/${data._id}`)
        setsubmitloading(false)
                
            } catch (error) {
                setError(error.message)
                setsubmitloading(false)
        } 
        
        

      }
  return (
    
    
    <main className='max-w-4xl mx-auto p-3'>
        {console.log(formdata)}
        
        <p className='font-bold text-2xl text-center p-3'>Create Listing</p>
        <form onSubmit={handlesumbmit} className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-6 '>
                <input type='text' placeholder='name' id='name' onChange={handlechange} value={formdata.name}
                className='p-3 border rounded-lg' required min={6} max={16}></input>
                <textarea type='text' placeholder='description' id='description' onChange={handlechange} value={formdata.description}
                className='p-3 border rounded-lg'></textarea>
                <input type='text' placeholder='address' id='address' onChange={handlechange} value={formdata.address}
                className='p-3 border rounded-lg'></input>
            
            <div className='flex flex-row gap-6 flex-wrap'>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='sale' onChange={handlechange} checked={formdata.type==="sale"}></input>
                <span>Sell</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='rent' onChange={handlechange} checked={formdata.type==="rent"}></input>
                <span>Rent</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='parking' onChange={handlechange} checked={formdata.parking}></input>
                <span>Parking Spot</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='furnished' onChange={handlechange} checked={formdata.furnished}></input>
                <span>Furnished</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='offer' onChange={handlechange} checked={formdata.offer}></input>
                <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-6'>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bedrooms' onChange={handlechange} value={formdata.bedrooms}></input>
                    <span > Bed</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bathrooms' onChange={handlechange} value={formdata.bathrooms}></input>
                    <span > Baths</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1000} max={100000000} id='regularPrice' onChange={handlechange} value={formdata.regularPrice}></input>
                    <div>
                        <p>Regular Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>
                {formdata.offer && 
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={50} max={100000000} id='discountPrice' onChange={handlechange} value={formdata.discountPrice}></input>
                    <div>
                        <p>Discounted Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>}
            </div>
            </div>
            <div className='flex flex-col gap-6'>
                <p><span className='font-bold'>Images:</span> The First image will be the cover (max 6)</p>
                <div className='flex flex-row gap-3'>
                    <input onChange={(e)=>{setImage(e.target.files)}} className='border rounded-lg p-3' type='file' accept='image/*' multiple ></input>
                    
                    <button type='button' onClick={hadleUploadImages} className='border bg-blue-700 p-3 text-white rounded-lg hover:opacity-70 cursor-pointer'>
                        {loading? "...Uploading": "Upload"}
                    </button>
                    
                </div>
                <p className='text-red-500'>{error && error}</p>

                {formdata.imageUrls.length > 0 &&
            formdata.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>   
              </div>
            ))}
                {!submitloading && <button disabled={loading||submitloading} className='disabled:opacity-55 p-3 bg-slate-700 text-white rounded-lg cursor-pointer hover:opacity-85'>
                    Create Listing
                </button>}
            </div>
            
        </form>
    </main>
  )
}
