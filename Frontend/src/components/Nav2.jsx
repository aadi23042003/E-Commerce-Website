import React from 'react'
import { Link } from 'react-router-dom'

const Nav2 = () => {
  return (
    <div className='bg-orange-400 hidden lg:flex w-full h-[6vh] gap-8 justify-center items-center font-semibold'>
        <Link to='/' className='hover:bg-yellow-300 p-0.5 rounded'>Home</Link>
        <Link to='category/' className='hover:bg-yellow-300 p-0.5 rounded'>Categories</Link>
            <Link to='about/' className='hover:bg-yellow-300 p-0.5 rounded'>About</Link>
                <Link to='contact/' href="" className='hover:bg-yellow-300 p-0.5 rounded'>Contact</Link>
                <Link to='shopnow/' className='bg-white rounded p-1 font-bold hover:scale-105'>Shop Now</Link>
    </div>
  )
}

export default Nav2