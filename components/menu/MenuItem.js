import React, {useEffect, useState} from 'react';
import {useCartContext} from "../../context/cart";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Image} from "react-bootstrap";
import {api} from "../../constants/api";


const MenuItem = (props) => {
    const {id, name, price, imgId, foodType} = props;
    const imgUrl = api.host+"/api/v1/getFile/" + imgId;
    const notify = () => toast.success(props.name + " savatga qo'shildi", {
        theme: "colored"
    })

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
        } else
            setCart([...cart.filter(value => value.id !== id)])


    }
    return (

          <div
              className=" bg-white border border-gray-100 duration-300  hover:shadow-xl hover:scale-105 p-4 rounded-lg ">
                <span
                    className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">{foodType}</span>
              <Image className="w-64 h-60 mx-auto  duration-300 hover:scale-105" src={imgUrl} alt=""/>

              <div className="flex flex-col items-center my-3 space-y-2">
                  <h1 className="text-gray-900 poppins text-lg">{name}</h1>

                      <h2 className="text-gray-900 poppins text-2xl font-bold">${price}</h2>

                      </div>
              <br/>
              {

                  foundItemFromCart ?
                      <div className={"flex ml-16 justify-content-center"}>
                          {/*bg-blue-500 hover:bg-blue-700 text-yellow font-bold py-2 px-4 rounded-full*/}
                          <button
                              className="bg-red-50 hover:bg-red-100 font-bold py-2 pr-4 pl-4 rounded text-red-600 "
                              onClick={() => changeQtn('-', id, name, price, imgId)}>-
                          </button>
                          <h1 className="font-medium text-2xl pl-7 pr-7 mt-1">{foundItemFromCart.qtn}</h1>
                          <button
                              className="bg-red-50 hover:bg-red-100 font-bold pl-3.5 pr-3.5 rounded text-red-600 "
                              onClick={() => changeQtn('+', id, name, price, imgId)}>+
                          </button>
                      </div> :


                      <div className={"flex ml-12 justify-content-center"}>
                          <button
                              onClick={() => {addToCart(id, price, name, imgId);notify()}}
                              className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-red-600 group">
                  <span
                      className="w-48 h-48 rounded rotate-[-40deg] bg-red-50 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                              <span
                                  className="relative w-full text-left text-red-600 transition-colors duration-300 ease-in-out group-hover:text-red-600">ADD TO CART</span>

                              <i className="mx-2 fas fa-shopping-cart text-red-600"></i>
                          </button>
                      </div>
              }

          </div>

        /*----------------------------------------------------------------------------------------------------------*/
     /*   <div
            className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
            <span
                className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">{foodType}</span>
            <img className="w-64 h-60 mx-auto transform transition duration-300 hover:scale-105" src={imgUrl} alt=""/>
            <div className="flex flex-col items-center my-3 space-y-2">
                <h1 className="text-gray-900 poppins text-lg">{name}</h1>
                {/!*   <p className="text-gray-500 poppins text-sm text-center">{description.slice(0,50)}</p>*!/}
                <h2 className="text-gray-900 poppins text-2xl font-bold">${price}</h2>

            </div>
            {

                foundItemFromCart ?
                    <div className={"flex ml-8 justify-content-center"}>
                        {/!*bg-blue-500 hover:bg-blue-700 text-yellow font-bold py-2 px-4 rounded-full*!/}
                        <button
                            className="bg-red-50 hover:bg-red-100 font-bold py-2 pr-4 pl-4 rounded text-red-600 "
                            onClick={() => changeQtn('-', id, name, price, imgId)}>-
                        </button>
                        <h1 className="font-medium text-2xl pl-7 pr-7 mt-1">{foundItemFromCart.qtn}</h1>
                        <button
                            className="bg-red-50 hover:bg-red-100 font-bold pl-3.5 pr-3.5 rounded text-red-600 "
                            onClick={() => changeQtn('+', id, name, price, imgId)}>+
                        </button>
                    </div> :


                    <div className={"flex justify-content-center"}>
                        <button
                            onClick={() => {
                                addToCart(id, price, name, imgId);
                                notify()
                            }}
                            className="relative inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-red-600 group">
                <span
                    className="w-48 h-48 rounded rotate-[-40deg] bg-red-50 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span
                                className="relative w-full text-left text-red-600 transition-colors duration-300 ease-in-out group-hover:text-red-600">ADD TO CART</span>

                            <i className="mx-2 fas fa-shopping-cart text-red-600"></i>
                        </button>
                    </div>
            }


        </div>
*/
    );
};
export default MenuItem;