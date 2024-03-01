import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {


  const { currentuser } = useSelector((state) => { return state.user});
  console.log(currentuser)
  return (
    
    
    <header className='bg-slate-400 shadow-md'>
    <div className='flex justify-between items-center max-w-7xl mx-auto p-3 '>
    <Link to={'/'}>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-600'>Findur</span>
        <span className='text-slate-800'>Estate</span>
    </h1>
    </Link>
    <form className='bg-slate-300 flex justify-between p-2 rounded-lg  sm:w-64'>
      <input type='text' placeholder='search...' className='bg-transparent focus:outline-none'/>
      <FaSearch></FaSearch>
    </form>
    <ul className='flex gap-4'>
      <Link to={'/'}>
      <li className='hidden sm:inline'>Home</li>
      </Link>
      <Link to={'/signup'}>
      <li className='hidden sm:inline'>Sign Up</li>
      </Link>
      {currentuser?<Link to={'/profile'}><img className='w-8 h-8 rounded-full object-cover' src={currentuser.photo}/></Link> :<Link className='focus:hover:underline' to={'/signin'}>
      <li>Sign In</li>
      </Link>}

    </ul>
    </div>
    </header>
    
  )
}
