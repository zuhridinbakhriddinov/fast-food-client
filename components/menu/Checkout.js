import React from 'react';
import {useCartContext} from "../../context/cart";

const Checkout = () => {
   /* function getImage(food) {
        return "http://localhost:8081/getFile/" + food.imgId
    }*/
    const [cart, setCart] = useCartContext();

    return (
        <div>
          {/*  {cart.map((items, i) => (
                <div className={'card'} key={i}>
                    <div className={'card-header'}>
                        <p className={'text-black'}>name {items.name}</p>
                    </div>
                    <div className={'card-img'}>
                        <img src={getImage(items)}/>
                    </div>
                    <div className={'card-body'}>

                        <p className={'text-black'}>price {items.price}</p>
                        <div className={"flex justify-around"}>

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => changeQtn('-', items.id,items.name, items.price, items.imgId)}>-</button>
                            <h1 className="text-black">{items.qtn}</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => changeQtn('+', items.id,items.name, items.price, items.imgId)}>+</button>
                        </div>

                    </div>
                </div>

            ))


            }*/}

        </div>
    );
};

export default Checkout;