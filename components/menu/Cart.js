import {Image} from "react-bootstrap";

const Cart = () => {
    function getImage(food) {
        return api.host+"/api/v1/getFile/" + food.imgId
    }

    const [cart, setCart] = useCartContext();


    const changeQtn = (action, id, name, price, imgId) => {
        const myCart = cart.find(value => value.id === id);
        const qtn = action === '+' ? myCart.qtn + 1 : myCart.qtn - 1
        if (qtn > 0) {
            console.log("ADDED TO CART LOCAL")
            setCart([...cart.filter(value => value.id !== id), {
                id, qtn, name, price, imgId

            }])

        } else
            setCart([...cart.filter(value => value.id !== id)])


    }
    return (
        <div>

            {cart.map((items, i) => (
                <div className={'card'} key={i}>
                    <div className={'card-header'}>
                        <p className={'text-black'}>name {items.name}</p>
                    </div>
                    <div className={'card-img'}>
                        <Image alt="..." src={getImage(items)}/>
                    </div>
                    <div className={'card-body'}>

                        <p className={'text-black'}>price {items.price}</p>
                        <div className={"flex justify-around"}>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={() => changeQtn('-', items.id, items.name, items.price, items.imgId)}>-
                            </button>
                            <h1 className="text-black">{items.qtn}</h1>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={() => changeQtn('+', items.id, items.name, items.price, items.imgId)}>+
                            </button>
                        </div>

                    </div>
                </div>

            ))


            }

        </div>
    );
};

import MenuItem from "./MenuItem";
import React from 'react';
import {useCartContext} from "../../context/cart";

import {useFoodContext} from "../../context/food";
import {api} from "../../constants/api";


export default Cart;

