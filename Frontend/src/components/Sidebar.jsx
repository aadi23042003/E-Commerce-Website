import React from 'react'
import {motion} from 'motion/react'
import { Link } from 'react-router-dom'
const Sidebar = ({active,setActive}) => {
  return (
    <>
    {active && <motion.div initial={{x:-1000}} animate={{x:0}} transition={{duration:0.7}} className='bg-neutral-900 text-white z-100 fixed h-screen w-full flex flex-col justify-center items-center text-2xl gap-3 font-semibold'>
        <button className='absolute right-2 top-2' onClick={()=>{
            setActive(!active)
        }}>X</button>
        <Link onClick={()=>{setActive(!active)}} to="/">Home</Link>
        <Link onClick={()=>{setActive(!active)}} to="category/">Category</Link>
        <Link onClick={()=>{setActive(!active)}} to="about/">About</Link>
        <Link onClick={()=>{setActive(!active)}} to="contact/">Contact</Link>
        <Link onClick={()=>{setActive(!active)}} to='shopnow/' href="shopnow/">ShopNow</Link>
    </motion.div>}
    </>
    
  )
}

export default Sidebar