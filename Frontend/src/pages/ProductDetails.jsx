import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const ProductDetails = () => {

  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const base = import.meta.env.VITE_Base_URL
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  const [quantity, setQuantity] = useState(1)
  const [qtyError, setQtyError] = useState("")

  const { addToCart } = useCart()

  useEffect(() => {
    axios
      .get(`${base}/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setErrors("Cannot fetch product")
        setLoading(false)
      })
  }, [id, base])


  const handleQuantityChange = (e) => {
    const value = Number(e.target.value)

    setQuantity(value)

    if (value > product.quantity) {
      setQtyError("Not in stock")
    } else if (value <= 0) {
      setQtyError("Quantity must be at least 1")
    } else {
      setQtyError("")
    }
  }


  const handleAddToCart = (productId) => {

    if (!localStorage.getItem('access_token')) {
      toast.error('Please login to add products to cart')
      window.location.href = '/login'
      return
    }

    if (qtyError) {
      toast.error(qtyError)
      return
    }

    addToCart(productId)

    
  }


  if (loading) {
    return <div>Loading Please Wait...</div>
  }

  if (errors) {
    return <div>{errors}</div>
  }

  if (!product) {
    return <div>No Such Product</div>
  }


  return (
    <div className='text-neutral-800 bg-white w-full flex min-h-[82.8vh] justify-center items-center'>
      
      <div
        key={product?.id}
        className='w-[90%] md:w-[80%] lg:w-[75%] flex flex-col md:flex-row gap-4 border border-white/10 shadow-2xl p-3'
      >

        {/* Product Image */}
        <div className='w-full md:w-[50%] lg:w-[40%]'>
          {product?.image && (
            <img
              src={product.image}
              alt="No image"
              className='w-full h-[60vh] bg-cover rounded-lg'
            />
          )}
        </div>

        {/* Product Details */}
        <div className='flex flex-col w-full md:w-[50%] lg:w-[60%] relative'>

          <h1 className='text-xl md:text-2xl font-semibold'>
            {product?.name}
          </h1>

          <del className='text-red-700'>
            <span className='text-neutral-700'>&#8377;</span> {product?.original_price}
          </del>

          <p className='text-lg'>
            <span>Price: &#8377;</span> {product?.price}
          </p>

          <p>Available Stock: {product?.quantity}</p>

          <br />

          {/* Quantity Input */}
          <div className='flex flex-col gap-1'>
            <span>Quantity:</span>

            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="border p-1 w-24"
            />

            {qtyError && (
              <span className="text-red-600 text-sm">{qtyError}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product.id)}
            className='border border-orange-500 font-bold p-2 rounded absolute left-36 lg:left-3 bottom-0 text-neutral-800 hover:bg-amber-600 cursor-pointer'
          >
            Add to cart
          </button>

        </div>
      </div>

    </div>
  )
}

export default ProductDetails
