import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authFetch,getAccessToken } from "../utils/auth";
const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const base = import.meta.env.VITE_Base_URL;

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await authFetch(`${base}/api/cart/`);
      

      const data = await response.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);

    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await authFetch(`${base}/api/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      toast.success("Product added to cart!");
      fetchCartItems();

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await authFetch(`${base}/api/cart/remove/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ product_id: productId })
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
        toast.error("Failed to remove product from cart!");
      }
      else{
        toast.success("Product removed from cart!");
      }
      
      fetchCartItems();

    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {

    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      const response = await authFetch(`${base}/api/cart/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ product_id: productId, quantity: quantity })
      });

      if (!response.ok) {
        throw new Error("Failed to update product quantity");
      }
      toast.success("Quantity updated!");
      setCartItems(prev =>
        prev.map(item =>
          item.product === productId ? { ...item, quantity } : item
        )
      );
      fetchCartItems();

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
