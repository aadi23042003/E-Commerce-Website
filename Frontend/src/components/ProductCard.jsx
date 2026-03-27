import React from 'react'
import { motion } from "motion/react"
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
const ProductCard = ({product,base}) => {
  const {addToCart}=useCart()
  const handleAddToCart=()=>{
      if(!localStorage.getItem('access_token')){
        toast.error('Please login to add products to cart');
        window.location.href='/login'
        return;
      }
      addToCart(product.id);
    };
  return (
    <Link to={`products/${product.id}`} className='w-[90%] md:w-[80%] lg:w-[20%] flex mx-auto hover:scale-105'>
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}} viewport={{amount:0.5,once:false}} className='rounded-lg border border-white/10 shadow-2xl mx-auto p-3 w-full md:w-full lg:w-full bg-oklch(98.4%_0.003_247.858) h-auto overflow-hidden'>
        <img src={`${base}${product.image}`} alt="No Image" className='w-full bg-cover rounded-lg h-64'/>
        <h2 className='text-lg font-semi mb-2 text-gray-800 truncate'>{product.name}</h2>
        <span>Price-</span> <del className='text-red-700'>&#8377;{product.original_price}</del>
        <span className='font-medium'> &#8377;{product.price}</span>
        <div className='flex gap-4'>
            <button
  onClick={(e) => {
    e.preventDefault();
    handleAddToCart();
  }}
  className='font-bold p-2 bg-green-600 rounded'
>
  Add To Cart
</button>
        </div>
    </motion.div>
            </Link>
  )
}

export default ProductCard