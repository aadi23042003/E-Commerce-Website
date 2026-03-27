import React, { use, useEffect, useRef } from 'react'
import { Profiler } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import logo from "../assets/logoo.png"
import { CiSearch } from "react-icons/ci";
import Sidebar from './Sidebar';
import { useCart } from '../context/CartContext';
import { Link,useNavigate } from 'react-router-dom';
import { clearToken,getAccessToken } from '../utils/auth';
import { toast } from 'react-toastify';
const Nav1 = ({active,setActive}) => {
  const {cartItems}=useCart()
  const cartItemCount=cartItems.reduce((total,item)=>total+item.quantity,0)
  const navigate=useNavigate()
  const isLoggedIn=!!getAccessToken();
  
  const handleLogout=()=>{
    toast.success("Logged out successfully")
    clearToken();
    
     window.location.href = "login/";
  }
  


  return (

    <div className='bg-amber-100 w-full flex flex-col lg:flex-row gap-2 p-2 justify-center items-center overflow-hidden'>
        
        <div className='text-3xl lg:4xl w-full gap-6 md:w-[40%] ld:w-[30%] flex justify-center items-center font-semibold'><h1 className='text-transparent bg-linear-to-r from-blue-600 to-orange-600 bg-clip-text'>Shopkart </h1><img src={logo} height='50px' width='50px' alt="" /> 
        <button onClick={() => setActive(!active)} className='lg:hidden absolute left-2 cursor-pointer'>&#9776;</button></div>
        <div className='w-full md:w-[70%] lg:w-[40%] flex items-center gap-2 p-2'>
  <input
    type="text"
    placeholder='Search Something Here...'
    className='p-2 flex-1 bg-neutral-900/10 border border-yellow-800/5'
  />

  <button
    type="button"
    
    className='border rounded hover:bg-amber-600 cursor-pointer p-2 z-10'
  >
    <CiSearch />
  </button>
</div>
        <div className='text-lg right-2 top-3 lg:top-6 lg:flex lg:w-[30%] justify-end gap-6'>
            <div className='flex gap-6 justify-center items-center'>
              
              <div className='flex items-center gap-6'>
                {isLoggedIn ? (
                  <button
  onClick={handleLogout}
  className="relative bg-neutral-900 text-white py-2 px-6 font-semibold rounded-3xl overflow-hidden hover:scale-105"
>
  {/* rotating border */}
  <span className="absolute inset-0 rounded-3xl animate-[spin_3s_linear_infinite] 
  bg-[conic-gradient(from_0deg,transparent,transparent,#3b82f6,#3b82f6,transparent)]"></span>

  {/* inner background */}
  <span className="absolute inset-[2px] bg-neutral-900 rounded-3xl"></span>

  {/* button text */}
  <span className="relative z-10">Logout</span>
</button>



                ) : (
                  <><Link to='/login' className='bg-neutral-600 p-1 rounded font-semibold text-white hover:scale-110'>Login</Link>
                  <Link to='/signup' className='bg-white text-neutral-800 p-1 font-semibold rounded hover:scale-110'>Sign Up</Link>
                  </>
                )}
              </div>
            <Link to='/cart' title='cart' className='hover:scale-110 flex'><FaCartPlus />{cartItemCount>0 && <span className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>{cartItemCount}</span>}</Link>
            </div>
        </div>

    </div>
  )
}

export default Nav1