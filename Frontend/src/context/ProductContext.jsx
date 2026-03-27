import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

// Create Context
const ProductContext = createContext();

// Initial State
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Reducer
function productReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

// Provider Component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  let url=import.meta.env.VITE_Product_URL
  const fetchProducts = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const response = await axios.get(
        url
      );

      dispatch({
        type: "FETCH_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        fetchProducts, // useful if you want manual refresh
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook (Best Practice)
export const useProducts = () => {
  return useContext(ProductContext);
};