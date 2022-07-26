import React, {useEffect, useState} from 'react';
import {useCartContext} from "../../context/cart";
import axios from "axios";
import {getCurrentUser} from "../../utils/ApiUtils";
import {useRouter} from "next/router";
import en from "../../locales/en/en";
import uz from "../../locales/uz/uz";
import Nav from "../Nav";


const Checkout = () => {
    let redirectUrl = "";

    function getImage(food) {
        return "http://localhost:8081/api/v1/getFile/" + food.imgId
    }

    const [option, setOption] = useState([{}])


    const [payType, setPayType] = useState([]);
    const [payTypeIdState, setPayTypeIdState] = useState([]);
    const [cart, setCart] = useCartContext();

    /*   const [orderItems,setOrderItems]=useState({
               'orderItem': [],

               'orderInfo': {

                   'payTypeId': "",
                   'userId': "",
                   'addressId': ""

               }
           })*/
    const orderItems = {
        'orderItem': [],

        'orderInfo': {

            'payTypeId': "",
            'userId': "",
            'addressId': ""

        }
    };

    function handleChangeSelectOption(event) {
        setOption(event.target.value)
        console.log(event.target.label + ' label')
        console.log(option + ' ichkaridagi')
    }

    {
        console.log(option + ' tashqarisidagi')
    }
    orderItems.orderInfo.addressId = option

    useEffect(() => {
        axios.get('http://localhost:8081/api/payments/getPayType')
            .then(function (response) {

                setPayType(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {

        axios.get('http://localhost:8081/api/address/e4db33a3-7b82-4548-abe5-0f78dc406200')
            .then(function (response) {

                console.log(response)
                setAddress(response.data.data)


            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);
    const [address, setAddress] = useState([]);

    const arr = []
    cart.map((c) =>
        /*arr.push(c.id) && arr.push(c.qtn)*/

        orderItems.orderItem.push({
            'foodId': c.id,
            'quantity': c.qtn
        })
    )
    /*   orderItems.orderItem.push({
           'foodId': c.id,
           'quantity': c.qtn
       })*/

    let sum = 0;
    cart.map((item) => {
        sum += item.qtn * item.price
    })
    console.log(sum + ' shu pullar')

    console.log(arr)
//    console.log(cart);
    let token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    function handleChange(event) {
        const payTypeId = event.currentTarget.value
        setPayTypeIdState(payTypeId)
        //  orderItems.payTypeId.push({payTypeId})
    }

    orderItems.orderInfo.payTypeId = payTypeIdState

    let userId = ""
    getCurrentUser()
        .then(function (response) {
                userId = response.id
                orderItems.orderInfo.userId = userId

            }
        )


    const purchase = () => {
        console.log(orderItems)
        axios.post('http://localhost:8081/order/purchase-products', {
            'orderItem': orderItems.orderItem,

            'orderInfo': {

                'payTypeId': orderItems.orderInfo.payTypeId,
                'userId': orderItems.orderInfo.userId,
                'addressId': orderItems.orderInfo.addressId


            }
        }, {headers: headers})
            .then(function (response) {

                console.log('WORKED')
                redirectUrl = response.data;
                window.location = redirectUrl
            })
            .catch(function (error) {

                console.log(error);
            });
    }


    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : uz;


    return (
        <div>

            {/*  <header className="flex flex-wrap">
                <nav className="flex w-screen justify-between bg-gray-50 text-gray-600">
                    <div className="w-full xl:px-12 py-6 px-5 flex space-x-12 items-center ">
                        <a className="text-2xl font-bold" href="#">
                            Your Logo
                        </a>
                        <ul className="hidden md:flex mx-auto px-5 font-semibold space-x-12">
                            <li><a className="hover:text-gray-900" href="#">Home</a></li>
                            <li><a className="hover:text-gray-900" href="#">Products</a></li>
                            <li><a className="hover:text-gray-900" href="#">Contact Us</a></li>
                        </ul>
                        <div className="flex-grow border-2 py-1 px-3 lg:flex justify-between round hidden">
                            <input className="flex-grow text-gray-600 focus:outline-none" type="text" placeholder="Search Product ..." />
                            <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-600 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                        </div>
                        <div className="hidden xl:flex items-center text-gray-600 space-x-5 items-center">
                            <a className="hover:text-gray-900" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </a>
                            <a className="flex items-center hover:text-gray-900" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute flex ml-4 -mt-5">
                            <span className="h-3 w-3 animate-ping absolute inline-flex rounded-full bg-pink-500 opacity-75"></span>
                            <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                        </span>
                            </a>
                        </div>
                    </div>
                    <a className="flex xl:hidden items-center mr-6 hover:text-gray-900" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="flex absolute -mt-5 ml-4">
                  <span className="h-3 w-3 absolute bg-pink-500 opacity-75 inline-flex rounded-full animate-ping"></span>
                  <span className="h-3 w-3 relative inline-flex rounded-full bg-pink-600"></span>
                </span>
                    </a>
                    <a className="xl:hidden self-center mr-12 hover:text-gray-900" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </a>
                </nav>
            </header>*/}

            {/*         header                 */}

            <div className="h-screen grid grid-cols-3">
                <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                    <div
                        className="mt-8 p-4  flex flex-col sm:flex-row sm:items-center bg-white  rounded-md">
                        <div
                            className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>

                            <div className="text-sm font-medium ml-3">{t.CHECKOUT}</div>
                        </div>

                     {/*   <div
                            className=" sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>*/}

                    </div>
                    {/*<div className="rounded-md">
                        <form id="payment-form" method="POST" action="">
                            <section>
                                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Name</span>
                                        <input name="name" className="focus:outline-none px-3" placeholder="Try Odinsson" required=""/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Email</span>
                                        <input name="email" type="email" className="focus:outline-none px-3" placeholder="try@example.com" required=""/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Address</span>
                                        <input name="address" className="focus:outline-none px-3" placeholder="10 Street XYZ 654"/>
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">City</span>
                                        <input name="city" className="focus:outline-none px-3" placeholder="San Francisco"/>
                                    </label>
                                    <label className="inline-flex w-2/4 border-gray-200 py-3">
                                        <span className="text-right px-2">State</span>
                                        <input name="state" className="focus:outline-none px-3" placeholder="CA"/>
                                           
                                    </label>
                                    <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                                        <span className="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                                        <input name="postal_code" className="focus:outline-none px-3" placeholder="98603"/>
                                    </label>
                                    <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                        <span className="text-right px-2">Country</span>
                                        <div id="country" className="focus:outline-none px-3 w-full flex items-center">
                                            <select name="country" className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none">
                                                <option value="AU">Australia</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BR">Brazil</option>
                                                <option value="CA">Canada</option>
                                                <option value="CN">China</option>
                                                <option value="DK">Denmark</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IT">Italy</option>
                                                <option value="JP">Japan</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MX">Mexico</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="SG">Singapore</option>
                                                <option value="ES">Spain</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US" selected="selected">United States</option>
                                            </select>
                                        </div>
                                    </label>
                                </fieldset>
                            </section>
                        </form>
                    </div>*/}
                    {/* <div className="rounded-md">
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Card</span>
                                    <input name="card" className="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC" required=""/>
                                </label>
                            </fieldset>
                        </section>
                    </div>*/}
                    <div className={'mt-20'}>
                        {
                            payType.map((items, i) => (
                                <div key={i} >
                                    <div className="form-check">
                                        <input
                                            onChange={(e) => handleChange(e)}
                                            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            type="radio" name="flexRadioDefault"
                                            id={items.id}
                                            value={items.id}

                                        />
                                        <label className="form-check-label inline-block text-gray-800"
                                               htmlFor={items.id}>
                                            {items.name}

                                        </label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>


                        <select id="countries" onChange={handleChangeSelectOption}
                                defaultValue={0}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                            <option
                                disabled value={0}>Select address
                            </option>
                            {address.map((a, i) => (

                                <option key={i}
                                        value={a.id}>{a.districtName} {a.name} {a.entrance}-{a.houseNumber}</option>

                            ))}
                        </select>


                    </div>

                    <button onClick={() => purchase()}
                            className="submit-button  px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                        Pay ${sum + 10}
                    </button>
                </div>

                    <div className="col-span-1 bg-white lg:block hidden">
                        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>

                        <ul className="py-6 border-b space-y-6 px-8">
                            {cart.map((items, i) => (
                                <li className="grid grid-cols-6 gap-2 border-b-1">
                                    <div className="col-span-1 self-center">
                                        <img src={getImage(items)} alt="Product" className="rounded w-full"/>
                                    </div>
                                    <div className="flex flex-col col-span-3 pt-2">
                                        <span className="text-gray-600 text-md font-semi-bold">{items.name}</span>

                                    </div>
                                    <div className="col-span-2 pt-3">
                                        <div className="flex items-center space-x-2 text-sm justify-between">
                                            <span className="text-gray-400">{items.qtn} x {items.price}</span>
                                            <span
                                                className="text-pink-400 font-semibold inline-block">${items.qtn * items.price}</span>
                                        </div>
                                    </div>
                                </li>))}

                        </ul>
                        <div className="px-8 border-b">
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-pink-500">${sum}</span>
                            </div>
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Delivery price</span>
                                <span className="font-semibold text-pink-500">$10</span>
                            </div>
                        </div>
                        <div className="font-semibold text-xl  px-8 flex justify-between py-8 text-gray-600">
                            <span>Total</span>
                            <span>${sum + 10}</span>
                        </div>
                    </div>
            </div>


        </div>
    );
};

export default Checkout;