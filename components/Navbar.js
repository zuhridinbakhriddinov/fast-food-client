import React, {Fragment, useState} from 'react';
import Link from "next/link";
import {useCartContext} from "../context/cart";
import Button from "./ui/Button";
import SlideOver from "./ui/SlideOverContent";
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {OverlayProvider, usePreventScroll} from 'react-aria';
import Cart from "./menu/Cart";
import CustomModal from "./ui/CustomModal";
import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    ArchiveActiveIcon,
    ArchiveInactiveIcon,
    DeleteActiveIcon,
    MoveActiveIcon,
    MoveInactiveIcon
} from "./ui/functions";
import {useRouter} from "next/router";
import en from "../locales/en/en";
import uz from "../locales/uz/uz";
import {changeLanguage, lan} from "../constants/api";
import {Cookies} from "react-cookie";


const Navbar = () => {

    let phoneNumberForRegister;
    let phoneNumberForLogin;

    ArchiveInactiveIcon();
    ArchiveActiveIcon();
    MoveInactiveIcon();
    MoveActiveIcon();
    DeleteActiveIcon();


    const [registerUserDto, setRegisterUserDto] = useState({
        "fullName": "",
        "phoneNumber": "",
        "smsCode": ""
    })
    const [loginUserDto, setLoginUserDto] = useState({
        "phoneNumber": "",
        "smsCode": ""
    })
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);

    const handleOnClose = () => setIsOpen(false);


    usePreventScroll({isDisabled: !isOpen});

    const [cartItems, setCartItems] = useCartContext();

    function handleChange(event) {
        phoneNumberForRegister = event.target.value;
    }

    function handleChange2(event) {
        const value = event.target.value;
        setRegisterUserDto({...registerUserDto, [event.target.name]: value});

        console.log(registerUserDto)
    }

    function handleChange3(event) {
        phoneNumberForLogin = event.target.value;


    }

    function handleChange4(event) {
        const value = event.target.value;
        setLoginUserDto({...loginUserDto, [event.target.name]: value});

    }

    phoneNumberForRegister = phoneNumberForRegister ? phoneNumberForRegister : null;

    function smsCodeForRegister() {
        if (phoneNumberForRegister === null) {
            toast.error("Phone number not blank")
        } else {
            axios.get('http://localhost:8081/api/v1/verification/send/forRegister/' + phoneNumberForRegister)
                .then(function (response) {
                    toast.success(response.data.message)
                    setRegisterUserDto({...registerUserDto, phoneNumber: phoneNumberForRegister});
                    console.log(response)


                })
                .catch(function (error) {
                    toast.error(error.response.data.message)
                    console.log(error);
                });
        }

    }

    function smsCodeForLogin() {

        axios.get('http://localhost:8081/api/v1/verification/send/forLogin/' + phoneNumberForLogin)
            .then(function (response) {
                //console.log(messageService(response))


                toast.success(response.data.message)

                setLoginUserDto({...loginUserDto, phoneNumber: phoneNumberForLogin});

                console.log(response)


            })
            .catch(function (error) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message)
            });


    }

    {
        console.log(registerUserDto)
    }
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    function registerUser() {
        axios.post('http://localhost:8081/api/v1/auth/register', {
            "fullName": registerUserDto.fullName,
            "phoneNumber": registerUserDto.phoneNumber,
            "smsCode": registerUserDto.smsCode
        }, {headers: headers})
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.data.access_token)
                    localStorage.setItem('refreshToken', response.data.data.refresh_token)
                    window.location.href = "/"


                } else {

                    console.log(response.data)
                }


            })
            .catch(function (err) {

                if (err?.response?.data?.errors?.length) {
                    err.response.data.errors.forEach(er => {

                        toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                    })
                } else {
                    toast.error('Error', {toastId: 'error' + Math.random()})
                }

                /*    console.log(error);
                    toast.error(error.response.data.errors.errorMsg)*/
            });
    }

    function loginUser() {
        axios.post('http://localhost:8081/api/auth/login', {
            "phoneNumber": loginUserDto.phoneNumber,
            "smsCode": loginUserDto.smsCode
        }, {headers: headers})
            .then(function (response) {

                if (response.status === 200) {
                    console.log(headers)

                    if (response.data.data.role[0] === 'COOK') {
                        location.href = "/cook"

                    }
                    if (response.data.data.role[0] === 'DELIVERER') {
                        location.href = "/courier"

                    }
                    if (response.data.data.role[0] === 'ROLE_CUSTOMER') {
                        location.href = "/"
                    }


                } else {

                    console.log(response.data)
                }


            })
            .catch(function (err) {

                if (err?.response?.data?.errors?.length) {
                    err.response.data.errors.forEach(er => {

                        toast.error(er?.errorMsg || 'Error', {toastId: 'error' + Math.random()})
                    })
                } else {
                    toast.error('Error', {toastId: 'error' + Math.random()})
                }
            });
    }


    let accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
    /*  const router = useRouter();
      let {t} = useTranslation('common');
      const contact = t('contact');*/
    const router = useRouter();
    const {locale} = router;
    const t = locale === 'en' ? en : uz;
    return (
        /*--------------------------------------------------------------------------------------------------------------------*/



        <div>
            <div id="nav" className="text-2xl text-white py-6 bg-black flex justify-around items-center">


                <div id="logo" className="flex items-center">
                    <img width="50px" src="/logo.png" alt="restaurant logo"/>
                    <p className="text-white mx-3">Zukich food</p>

                </div>


                {/*                                for register                  */}
                <CustomModal visible={showModal} onClose={() => setShowModal(false)}>
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold text-center text-2xl text-yellow-300">
                            Authorization

                        </h1>
                        <p className="py-1 text-gray-500">

                        </p>
                        <input
                            placeholder="+99893 087 03 08"
                            type="text"
                            name={'phoneNumber'}
                            onChange={(e) => handleChange(e)}
                            className="w-full bg-black border border-black-500 p-1 mt-2 rounded "
                        />
                        <button
                            onClick={() => {
                                setShowModal2(true);
                                smsCodeForRegister();
                            }}
                            className="mt-6 mx-16 py-2 text-center rounded-full px-5 bg-blue-500 text-white">
                            Get the code
                        </button>
                        <p className={'text-black'}>Akkountingiz bormi</p> <Button onClick={() => {
                        setShowModal3(true);
                        setShowModal(false)
                    }}>Kirish</Button>
                    </div>
                </CustomModal>
                {/*------------------------------- for register sms code and name  -----------------------------------------------------*/}
                <CustomModal visible={showModal2} onClose={() => setShowModal2(false)}>
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold  text-2xl text-black">
                            Your name

                        </h1>
                        <input
                            type="text"
                            name={'fullName'}
                            onChange={(e) => handleChange2(e)}
                            className="w-full bg-white text-yellow-400 text-bold border border-yellow-500 p-1 mt-2 rounded "
                        />
                        <h1 className="font-bold  text-2xl text-black">
                            Sms code
                        </h1>
                        <input
                            type="text"
                            name={'smsCode'}
                            onChange={(e) => handleChange2(e)}
                            className="w-full bg-white text-yellow-400 text-bold border border-yellow-500 p-1 mt-2 rounded"
                        />
                        <button
                            onClick={() => {
                                setShowModal2(false);
                                registerUser();
                                setShowModal(false);

                            }}
                            className="mt-6 mx-16 py-2 text-center rounded-full px-5 bg-blue-500 text-white">
                            Sign in
                        </button>

                    </div>
                </CustomModal>
                {/*-----------------------------login for number  -------------------------------------------------------*/}
                <CustomModal visible={showModal3} onClose={() => setShowModal3(false)}>
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold  text-2xl text-black">
                            phone number login

                        </h1>
                        <input
                            type="text"
                            name={'phoneNumber'}
                            onChange={(e) => handleChange3(e)}
                            placeholder={'+998930870308'}
                            className="w-full bg-white text-yellow-400 text-bold border border-yellow-500 p-1 mt-2 rounded "
                        />


                        <button
                            onClick={() => {
                                setShowModal3(false);
                                smsCodeForLogin()
                                setShowModal4(true);

                            }}
                            className="mt-6 mx-16 py-2 text-center rounded-full px-5 bg-blue-500 text-white">
                            get sms code
                        </button>
                        <p className={'text-black'}>Akkountingiz yoqmi</p> <Button onClick={() => {
                        setShowModal3(false);
                        setShowModal(true)
                    }}>Registration</Button>

                    </div>
                </CustomModal>
                {/*-----------------------------login for sms code  -------------------------------------------------------*/}
                <CustomModal visible={showModal4} onClose={() => setShowModal4(false)}>
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold  text-2xl text-black">
                            sms code

                        </h1>
                        <input
                            type="text"
                            name={'smsCode'}
                            onChange={(e) => handleChange4(e)}
                            className="w-full bg-white text-yellow-400 text-bold border border-yellow-500 p-1 mt-2 rounded "
                        />


                        <button
                            onClick={() => {
                                setShowModal4(false);
                                loginUser();

                                setShowModal(false);

                            }}
                            className="mt-6 mx-16 py-2 text-center rounded-full px-5 bg-blue-500 text-white">
                            get sms code
                        </button>
                        <p className={'text-black'}>Akkountingiz yoqmi</p> <Button onClick={() => {
                        setShowModal3(false);
                        setShowModal(true)
                    }}>Registration</Button>

                    </div>
                </CustomModal>

                <div id="menu" className="w-96 flex justify-around">

                    <Link href="/">
                        <div
                            className="mx-6 text-[20px] rounded-full  hover:cursor-pointer transform  bg-black-400 w-50 transition duration-500  hover:bg-yellow-300 flex justify-center items-center ">
                            <p>Menu</p>
                        </div>
                    </Link>

                    <Link href="/myOrders">
                        <div
                            className="text-[20px] rounded-full  hover:cursor-pointer transform  bg-black-400 w-50 transition duration-500  hover:bg-yellow-300 flex justify-content-between items-center ">
                            <p>My </p>
                            <p className={'px-1'}>orders </p>
                        </div>
                    </Link>
                    <Link href="/contact">
                        <div
                            className="mx-6 text-[20px] rounded-full  hover:cursor-pointer transform  bg-black-400 w-40 transition  duration-500  hover:bg-yellow-300 flex justify-center items-center ">
                            <p>{t.a}</p>
                        </div>
                    </Link>
                    <Link href="/about">
                        <div
                            className="text-[20px] rounded-full  hover:cursor-pointer transform  bg-black-400 w-50 transition duration-500  hover:bg-yellow-300 flex justify-center items-center ">
                            <p>About</p>
                        </div>
                    </Link>
                </div>


                <div className="flex items-center justify-between w-48">

                    <div id="header-icons" className="w-24 flex justify-around">
                        <div>
                            <OverlayProvider>
                                <div>
                                    <a onClick={() => setIsOpen(true)}
                                       className="flex items-center hover:text-yellow-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        </svg>
                                        <span className="absolute flex ml-4 -mt-5">
                            <span
                                className="h-2 w-2 animate-ping absolute inline-flex rounded-full bg-yellow-300 opacity-75"></span>
                            <span className="h-2 w-2 relative inline-flex rounded-full bg-yellow-300"></span>
                        </span>
                                    </a>

                                    <SlideOver
                                        isOpen={isOpen}
                                        onClose={handleOnClose}
                                        title="Item ">
                                        <div className="flex flex-col">
                                            {cartItems.length > 0 ?
                                                <div>
                                                    <Cart/>
                                                    <Link href="/checkout">
                                                        <div
                                                            className="rounded-full hover:text-base hover:cursor-pointer transform  bg-black-400 w-20 transition duration-500 hover:scale-125 hover:bg-yellow-300 flex justify-center items-center ">
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


                        <span className="relative inline-block flex items-center ">
  <svg className="hover:text-yellow-300 w-8 h-8 text-white-100 fill-current" viewBox="0 0 20 20"><path
      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      clipRule="evenodd" fillRule="evenodd"></path>
  </svg>
  <span
      className="hover:bg-black-300 hover:text-black-100  absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black-900 transform translate-x-1/2 -translate-y-1/2 bg-yellow-300 rounded-full"> <p>99</p></span>
</span>

                    </div>

                    {accessToken ?
                        <div id="profile-image"
                             className="w-14 h-14 border rounded-full overflow-hidden position-fixed">
                            <div className="fixed  w-16 ">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div className={'position-fixed'}>
                                        <Menu.Button
                                            className="inline-flex object-center  w-full justify-center rounded-md bg-white bg-opacity-10 px-2 py-2 text-sm font-medium text-white
                                              focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                                                focus-visible:ring-opacity-75">
                                            <img className="object-cover object-center " src="/person1.png"
                                                 alt="profile-image"/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                            <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link href={"/aboutMe"}>
                                                            <button
                                                                className={`${
                                                                    active ? 'bg-yellow-300 text-white' : 'text-yellow-400'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                {active ? (
                                                                    <ArchiveActiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <ArchiveInactiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                About me
                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>

                                                    {({active}) => (
                                                        <Link href={"/address"}>
                                                            <button
                                                                className={`${
                                                                    active ? 'bg-yellow-300 text-white' : 'text-yellow-400'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                            >

                                                                {active ? (
                                                                    <MoveActiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <MoveInactiveIcon
                                                                        className="mr-2 h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                                My address


                                                            </button>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (

                                                        <button onClick={() => {
                                                            localStorage.removeItem("accessToken");
                                                            localStorage.removeItem("refreshToken")
                                                            location.href = "/"
                                                        }}
                                                                className={`${
                                                                    active ? 'bg-yellow-300 text-white' : 'text-yellow-400'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >

                                                            {active ? (
                                                                <MoveActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <MoveInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Log out
                                                        </button>

                                                    )}
                                                </Menu.Item>
                                            </div>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                            {/*    <img className="object-cover object-center" src="/person1.png" alt="profile-image"/>*/}
                        </div> :

                        <div id="profile-image" className="w-14 h-14 border rounded-full overflow-hidden">
                            <div className="fixed  w-16 ">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button
                                            className="inline-flex object-center  w-full justify-center rounded-md bg-white bg-opacity-10 px-2 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-75">
                                            <img className="object-cover object-center"
                                                 src="https://img.icons8.com/color/100/000000/denied-skin-type-7.png"
                                                 alt="profile-image"/>
                                            <ChevronDownIcon
                                                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                            <div className="px-1 py-1">

                                                <Menu.Item>
                                                    {({active}) => (
                                                        <button onClick={() => setShowModal(true)}
                                                                className={`${
                                                                    active ? 'bg-yellow-300 text-white' : 'text-yellow-400'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >

                                                            {active ? (
                                                                <MoveActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <MoveInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Sign in
                                                        </button>

                                                    )}
                                                </Menu.Item>
                                            </div>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            {/*    <img className="object-cover object-center" src="/person1.png" alt="profile-image"/>*/}
                        </div>
                    }


                </div>


            </div>


        </div>


    );
};

export default Navbar;

