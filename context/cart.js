import React, {createContext, useContext, useEffect, useState} from 'react';
import {Cookies} from "react-cookie";

const Context = createContext();


export const CartProvider = ({children}) => {

  //  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('my-cart')) || []);
    const initialState = [];
    const [cartItems, setCartItems] = useState(initialState);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("cartItems"));
        if (cartData) {
            setCartItems(cartData);
        }
    }, []);

    useEffect(() => {
        if (cartItems !== initialState) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    return (
        <Context.Provider value={
            [cartItems, setCartItems]
        }>{children}</Context.Provider>
    );
};

export const    useCartContext = () => {
    return useContext(Context)
}

