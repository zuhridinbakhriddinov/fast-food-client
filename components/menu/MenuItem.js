import React, {useEffect, useState} from 'react';
import {useCartContext} from "../../context/cart";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


/*const MenuItem = (props) => {

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
        } else
            setCart([...cart.filter(value => value.id !== id)])


    }
    const img = "http://localhost:8081/api/v1/getFile/" + imgId


    return (
        <div>


            <div className="flex justify-center items-center   ">
                <div
                    className="
          bg-white
          shadow-md
          h-96
          mx-3
          rounded-2xl
          flex flex-col
          justify-around
          items-center
          overflow-hidden
          sm:flex-row sm:h-52 sm:w-3/5
          md:w-96
        "
                >
                    <img
                        className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
                        src={img}
                        alt="image"
                    />

                    <div
                        className=" flex-1  w-full
            flex flex-col
            items-baseline
            justify-around
            h-1/2
            pl-6
            sm:h-full sm:items-baseline sm:w-1/2">
                        <div className="flex flex-col justify-start items-baseline">
                            <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                {name}
                            </h1>

                        </div>
                        <p className="text-xs text-gray-500 w-4/5">
                            Ergonimical for human body curv
                        </p>
                        <div className="w-full flex justify-between items-center">
                            <h1 className="font-bold text-gray-500">${price}</h1>
                            {
                                foundItemFromCart ?
                                    <div className={"h-25 w-20 flex justify-content-between"}>
                                        {/!*bg-blue-500 hover:bg-blue-700 text-yellow font-bold py-2 px-4 rounded-full*!/}
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-yellow font-bold py-1 px-3 rounded-full"
                                            onClick={() => changeQtn('-', id, name, price, imgId)}>-
                                        </button>
                                        <h1 className={'font-lg'}>{foundItemFromCart.qtn}</h1>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-yellow font-bold py-1 px-3 rounded-full"
                                            onClick={() => changeQtn('+', id, name, price, imgId)}>+
                                        </button>
                                    </div>
                                    :
                                    <div className={"flex justify-content-between"}>
                                        <button
                                            onClick={() => addToCart(id, price, name, imgId)}
                                            className="mt-4 inline-flex items-center py-2 px-3
                       text-sm font-medium text-center text-white bg-blue-700
                       rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                        focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Add to cart

                                            <i className="mx-2 fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};*/
const MenuItem = (props) => {
    const {id, name, price, imgId, foodType} = props;
    const imgUrl = "http://localhost:8081/api/v1/getFile/" + imgId;
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
              className=" bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
                <span
                    className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">{foodType}</span>
              <img className="w-64 h-60 mx-auto transform transition duration-300 hover:scale-105" src={imgUrl} alt=""/>

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