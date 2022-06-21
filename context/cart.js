import React, {createContext, useContext, useState} from 'react';
import {Cookies} from "react-cookie";

const Context = createContext();


export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([ ]);


    return (
        <Context.Provider value={
            [cartItems, setCartItems]
        }>{children}</Context.Provider>
    );
};

export const useCartContext = () => {
    return useContext(Context)
}

