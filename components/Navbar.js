import React, {useState, useEffect} from 'react';
import Link from "next/link";
import {useCartContext} from "../context/cart";
import {useThemeContext} from "../context/theme";
import Button from "./ui/Button";
import SlideOver from "./ui/SlideOverContent";


import {OverlayProvider, usePreventScroll, OverlayContainer} from 'react-aria';
import Cart from "./menu/Cart";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClose = () => setIsOpen(false);


    usePreventScroll({isDisabled: !isOpen});

    const [cartItems, setCartItems] = useCartContext();
    return (
        <div>

            <div id="nav" className="text-2xl text-white py-6 bg-black flex justify-around items-center">
                <div id="logo" className="flex items-center">
                    <img width="50px" src="/logo.png" alt="restaurant logo"/>
                    <p className="text-white mx-3">Zukich food</p>
                </div>


                <div id="menu" className="w-96 flex justify-around">

                    <Link href="#menu">
                        <div className="rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-center items-center ">
                            <p>Menu</p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div
                            className="  rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-around items-center ">
                            <p className="w-20 ">My orders</p>
                        </div>
                    </Link>
                    <Link href="/contact">
                        <div
                            className="rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-center items-center ">
                            <p>Contact</p>
                        </div>
                    </Link>
                    <Link href="/about">
                        <div
                            className="rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-center items-center ">
                            <p>About</p>
                        </div>
                    </Link>
                </div>
                <div id="search-bar">
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25px"
                         height="25px"><path
                        d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
                    </span>
                        <input
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
                            placeholder="Search..." type="text" name="search"/>
                    </label>
                </div>


                <div id="header-icons"></div>
                <div id="header-icons"></div>

                <div className="flex items-center justify-between w-48">

                    <div id="header-icons" className="w-24 flex justify-around">
                        {/*<img width="25px" src="/cart.svg" alt="cart"/>*/}


                        <div>

                            <OverlayProvider>
                                <div>
                                    <i onClick={() => setIsOpen(true)} className="fa fa-shopping-cart fa-lg"
                                       aria-hidden="true"></i>
                                    <SlideOver
                                        isOpen={isOpen}
                                        onClose={handleOnClose}
                                        title="Item ">
                                        {console.log(cartItems)}
                                        <div className="flex flex-col">
                                            {cartItems.length > 0 ?
                                                <div>
                                                    <Cart/>
                                                    <Link href="/checkout">
                                                        <div className="rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-center items-center ">
                                                            <button>Checkout</button>
                                                        </div>
                                                    </Link>
                                                </div>

                                                :
                                                <div>
                                                    <div className={'mx-auto my-32'}>
                                                        <img src={'s2.png'}/>
                                                    </div>

                                                    <h6 className={'font-bold leading-7 text-2xl mx-2 my-2 text-cyan-800'}>Your
                                                        cart is empty, please
                                                        open the Menu
                                                        and choose the item you like.</h6>
                                                    <Button className="mt-12" onClick={handleOnClose}>Add to
                                                        cart</Button>
                                                </div>
                                            }
                                        </div>
                                    </SlideOver>
                                </div>


                            </OverlayProvider>
                        </div>



                        <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
                    </div>
                    <div id="profile-image" className="w-14 h-14 border rounded-full overflow-hidden">
                        <img className="object-cover object-center" src="/person.png" alt="profile-image"/>
                    </div>

                </div>


            </div>




        </div>


    );
};

export default Navbar;

