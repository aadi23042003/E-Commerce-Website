import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const CartPage = () => {
    const base=import.meta.env.VITE_Base_URL
    const {cartItems,total,removeFromCart,updateQuantity}=useCart()
    
    return (
        <div className="text-neutral-800 bg-white w-full flex min-h-[82.8vh] justify-center items-center">
            <div className="w-[90%] md:[w-80%] lg:w-[75%] flex flex-col gap-4 border border-white/10 shadow-2xl p-3">
                <h1 className="text-2xl font-bold mx-auto text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 bg-clip-text">Your Cart</h1>
                {cartItems.length===0?(
                    <p className="">Your cart is empty!</p>
                ):(
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item)=>(
                            <div key={item.id} className="flex flex-col md:flex-row gap-4 border border-white/10 p-3">
                                <div className="w-full md:w-[30%] lg:w-[20%]">
                                    <img src={item.product_image && item.product_image.startsWith('http') ? item.image : `${base}${item.product_image}`} alt={item.name} className="w-full h-40 bg-cover rounded"/>
                                </div>
                                <div className="flex flex-col w-full md:w-[70%] lg:w-[80%]">
                                    <h2 className="text-xl">{item.product_name}</h2>
                                    <p><span>Price: &#8377;</span> {item.product_price}</p> 
                                    <div className="flex items-center gap-2">
                                        <span>Quantity:</span>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e)=>updateQuantity(item.product,parseInt(e.target.value) || 1)}
                                            className="border p-1 w-24"
                                        />
                                        {item.quantity > item.stock && (
                                            <span className="text-red-500">Not in stock..</span>
                                        )}
                                    </div>
                                    <button onClick={()=>removeFromCart(item.product)} className="border border-red-500 text-red-500 font-bold p-2 rounded mt-2 hover:bg-red-500 hover:text-white cursor-pointer w-max">Remove</button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right text-xl font-bold">
                            <span>Total: &#8377;</span> {total}
                        </div>
                        <Link to="/checkout" className="border border-green-500 text-green-500 font-bold p-2 rounded mt-2 hover:bg-green-500 hover:text-white cursor-pointer w-max self-end">Proceed to Checkout</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default CartPage