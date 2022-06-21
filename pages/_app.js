import '../styles/globals.css'
import {CartProvider} from "../context/cart";
import {ThemeProvider} from "../context/theme";
import {useEffect, useState} from "react";
import {FoodProvider} from "../context/food";
import { CookiesProvider } from "react-cookie"

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
        <ThemeProvider>
            <CartProvider>
                <FoodProvider>
                    <Component {...pageProps} />
                </FoodProvider>
            </CartProvider>
        </ThemeProvider>
    </CookiesProvider>
    )
}}

export default MyApp


