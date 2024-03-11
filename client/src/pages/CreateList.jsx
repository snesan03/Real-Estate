import React from 'react'

export default function CreateList() {
  return (
    <main className='max-w-4xl mx-auto p-3'>
        <p className='font-bold text-2xl text-center p-3'>Create Listing</p>
        <form className='flex flex-col  sm:flex-row gap-6'>
            <div className='flex flex-col gap-6 flex-1'>
                <input type='text' placeholder='name' id='name' 
                className='p-3 border rounded-lg' required min={6} max={16}></input>
                <textarea type='text' placeholder='description' id='description' 
                className='p-3 border rounded-lg'></textarea>
                <input type='text' placeholder='address' id='address' 
                className='p-3 border rounded-lg'></input>
            
            <div className='flex flex-row gap-6 flex-wrap'>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='sell'></input>
                <span>Sell</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='rent'></input>
                <span>Rent</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='parkingspot'></input>
                <span>Parking Spot</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='furnished'></input>
                <span>Furnished</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='sell'></input>
                <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-6'>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bedroom'></input>
                    <span > Bed</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bathroom'></input>
                    <span > Baths</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1000} max={100000000} id='regularprice'></input>
                    <div>
                        <p>Regular Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1000} max={100000000} id='discountedprice'></input>
                    <div>
                        <p>Discounted Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>
            </div>
            </div>
            <div className='flex flex-col gap-6'>
                <p><span className='font-bold'>Images:</span> The First image will be the cover (max 6)</p>
                <div className='flex flex-row gap-3'>
                    <input className='border rounded-lg p-3' type='file' accept='image/*' multiple ></input>
                    <button className='border bg-blue-700 p-3 text-white rounded-lg hover:opacity-70 cursor-pointer'>
                        Upload
                    </button>
                    
                </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg cursor-pointer hover:opacity-85'>
                    Create Listing
                </button>
            </div>
            
        </form>
    </main>
  )
}
