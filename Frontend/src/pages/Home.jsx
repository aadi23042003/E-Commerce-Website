import React from 'react'
import cover from "../assets/cover2.png"
import { FaShippingFast } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import { FaAmazonPay } from "react-icons/fa";
import ProductCard from '../components/ProductCard';
import Productlist from '../components/Productlist';
import { motion } from 'motion/react';

const Home = () => {
  return (
    
        <div className='w-[100%] overflow-hidden bg-white'>
            <div className='h-[70vh] overflow-hidden'>
                <img src={cover} alt="" className='bg-cover h-full w-full'/>
            </div>
            <motion.div initial={{opacity:0,scale:0}} whileInView={{scale:1,opacity:1}} transition={{duration:1}} viewport={{amount:0.8,once:true}} className='p-4 w-full flex flex-col lg:flex-row gap-8 lg:gap-4 justify-center items-center overflow-hidden'>
                <div className='rounded-xl h-[25vh] md:h-[20vh] p-3 flex bg-white/40 w-[80%] shadow-xl lg:w-[25%] flex justify-around items-center overflow-hidden gap-4'>
                <div className='text-orange-400'><p className='text-3xl'><FaShippingFast/></p></div>
                <div><h1 className='text-lg lg:text-xl font-semibold'>Free Shipping</h1>
                <p>Rapid and free shipping.</p>
                </div>
                </div>
                <div className='rounded h-[25vh] md:h-[20vh] p-3 flex bg-white/10 shadow-xl w-[80%] lg:w-[25%] flex justify-around items-center overflow-hidden gap-4'>
                <div className='text-orange-400'><p className='text-3xl'><GrPowerCycle/></p></div>
                <div><h1 className='text-lg lg:text-xl font-semibold'>Easy Return</h1>
                <p>Rapid and free shipping.</p>
                </div>
                </div>
                <div className='rounded h-[25vh] md:h-[20vh] p-3 flex bg-white/40 shadow-xl w-[80%] lg:w-[25%] flex justify-around items-center overflow-hidden gap-4'>
                <div className='text-orange-400'><p className='text-3xl'><FaAmazonPay/></p></div>
                <div><h1 className='text-lg lg:text-xl font-semibold'>Secure Payment</h1>
                <p>Rapid and free shipping.</p>
                </div>
                </div>
                
            </motion.div>
            <div className='w-full'>
                <Productlist/>
            </div>
                
            
        </div>
    
  )
}

export default Home