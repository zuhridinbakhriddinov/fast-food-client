import '../styles/globals.css'
import {CartProvider} from "../context/cart";
import {useEffect, useState} from "react";
import {FoodProvider} from "../context/food";
import { CookiesProvider } from "react-cookie"
import {ToastContainer} from "react-toastify";

function MyApp({Component, pageProps}) {

    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
    return (

    <CookiesProvider>
            <CartProvider>
                <FoodProvider>
                    <Component {...pageProps} />
                    <ToastContainer/>
                </FoodProvider>
            </CartProvider>
    </CookiesProvider>
    )
}}

export default MyApp


