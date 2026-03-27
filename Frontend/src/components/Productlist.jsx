import React from 'react'
import { useState,useEffect } from 'react'
import ProductCard from './ProductCard'
import { useProducts } from '../context/ProductContext'
import { motion } from 'motion/react'

const Productlist = () => {

    const {products,loading,error}=useProducts()
    if(loading) return <h2>Loading........</h2>
    if(error) return <h2>{error}</h2>
    
    let base=import.meta.env.VITE_Base_URL
    
  return (
    <div className='w-[100%] p-3 flex flex-col md:flex-row gap-4'>
        {products.length>0?products.map((product,idx)=>(
            <ProductCard product={product} key={idx} base={base}/>
        )):"No Products....."}
    </div>
  )
}

export default Productlist