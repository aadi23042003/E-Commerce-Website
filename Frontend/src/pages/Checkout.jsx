import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { authFetch } from "../utils/auth";
const Checkout = () => {
    const base=import.meta.env.VITE_Base_URL
    const navigate=useNavigate()
    const {clearCart}=useCart()
    const [formData,setFormData]=useState({
        name:'',
        address:'',
        phone:'',
        payment_method:'COD',
    })
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState('')
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        setMessage('')
        try {
            const response=await authFetch(`${base}/api/orders/create/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data=await response.json()
            if (!response.ok) {
                setMessage(data || 'An error occurred')
            } else {
                setMessage('Order placed successfully!')
                await authFetch(`${base}/api/cart/`)
                clearCart()
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
        } catch (error) {
            setMessage('An error occurred while placing the order')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="text-neutral-800 bg-white w-full flex min-h-[82.8vh] justify-center items-center">
            <div className="w-[90%] md:[w-70%] lg:w-[50%] flex flex-col gap-4 border border-white/10 shadow-2xl p-3 bg-yellow-100 rounded-2xl">
                <h1 className="text-2xl font-bold mx-auto text-transparent bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text">Checkout</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full"/>
                    <textarea type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full"/>
                    <input type="text" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full"/>
                    <select name="payment_method" value={formData.payment_method} onChange={handleChange} className="border p-2 w-full">
                        <option value="COD">Cash on Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                    <button type="submit" disabled={loading} className="border border-green-500 text-green-500 font-bold p-2 rounded mt-2 hover:bg-green-500 hover:text-white cursor-pointer w-max">
                        {loading?'Processing...':'Place Order'}
                    </button>
                </form>
                {message && (
                    <p className={`text-center font-bold ${message.includes('successfully')?'text-green-500':'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
    }
export default Checkout