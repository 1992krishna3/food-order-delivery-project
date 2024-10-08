import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url ="http://localhost:3000" // backend URL
    const [token,setToken] = useState(""); // JWT token for authentication

    

    const addToCart = async (itemId) => {
       try { 
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

    // Prepare the data to send to the backend
    const data = {
        itemId, // Send the itemId
        quantity: cartItems[itemId] ? cartItems[itemId] + 1 : 1, // New quantity
    };   
    console.log('Using token:', token);

         // Send the request to the backend to add to cart
         const response = await axios.post(`${url}/api/cart/add`, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Add JWT token for authentication
            },
        });

            // Log the response to confirm it worked
            console.log("Item added to cart on server:", response.data);
        } catch (error) {
            console.error("Error adding item to cart:", error.response?.data || error.message);
        }
    };
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    
    try {
        // Send the request to the backend to remove from cart
        const data = {
            itemId, // Send the itemId
            quantity: cartItems[itemId] - 1, // New quantity after removing
        };

        const response = await axios.post(`${url}/api/cart/remove`, data, {
            headers: {
                Authorization: `Bearer ${token}`, // Add JWT token for authentication
            },
        });

        console.log("Item removed from cart on server:", response.data);
    } catch (error) {
        console.error("Error removing item from cart:", error.response?.data || error.message);
    }
}



    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
        setCartItems(response.data.cartData);
    }



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;


