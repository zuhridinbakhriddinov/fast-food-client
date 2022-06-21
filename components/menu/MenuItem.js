import React, {useEffect, useState} from 'react';
import {useCartContext} from "../../context/cart";

const MenuItem = (props) => {
    const {id, name, price, imgId} = props;

    const [cart, setCart] = useCartContext();

    const foundItemFromCart = cart.find(element => element.id === id);

    const addToCart = (id, price, name, imgId) => {


        setCart([...cart, {id, qtn: 1, price, name, imgId}])


    }

    const changeQtn = (action, id, name, price, imgId) => {
        const food = cart.find(value => value.id === id);
        const qtn = action === '+' ? food.qtn + 1 : food.qtn - 1

        if (qtn > 0) {

            setCart([...cart.filter(value => value.id !== id), {
                id, qtn, name, price, imgId

            }
            ])
            cart.sort()
            console.log(cart)
        } else
            setCart([...cart.filter(value => value.id !== id)])


    }
    /*thissss*/
    const img = "http://localhost:8081/getFile/" + imgId


    return (
        <div>
            <div
                className="max-w-lg bg-white rounded-2xl border border-black-900 hover:shadow-sm dark:bg-gray-900 dark:border-yellow-900">
                <a href="#">
                    <img className="rounded-t-lg w-200 justify-center  rounded-xl border bg-blue-500 " src={img}
                         alt=""/>
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <h1 className={"text-white"}>ID: {id}</h1>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{price}$</p>
                    {
                        foundItemFromCart ?
                            <div className={"flex justify-around"}>

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => changeQtn('-', id, name, price, imgId)}>-
                                </button>
                                <h1 className="text-white">{foundItemFromCart.qtn}</h1>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => changeQtn('+', id, name, price, imgId)}>+
                                </button>
                            </div>
                            :
                            <button
                                onClick={() => addToCart(id, price, name, imgId)}
                                className="mt-4 inline-flex items-center py-2 px-3
                       text-sm font-medium text-center text-white bg-blue-700
                       rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to cart

                                <i className="mx-2 fas fa-shopping-cart"></i>
                            </button>
                    }


                </div>
            </div>
        </div>
    );
};

export default MenuItem;