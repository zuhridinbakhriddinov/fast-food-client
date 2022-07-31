import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import CustomModal from "./ui/CustomModal";
import {api} from "../constants/api";

const Address = () => {
    const[userId,setUserId]=useState();
    useEffect(() => {
        axios.get(api.host+'/api/v1/auth/me',{headers:headers})
            .then(function (response) {

                console.log(response)
                // eslint-disable-next-line react-hooks/exhaustive-deps
               setUserId(response.data.data.id)


            })
            .catch(function (error) {
                console.log(error);
            });


    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userId]);
    console.log(userId+' <<<<<<<<<<<<<<')
    let token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState([]);

    useEffect(() => {

        axios.get(api.host+`/api/address/${userId}`,{headers:headers})
            .then(function (response) {

                console.log(response)
                setAddress(response.data.data)


            })
            .catch(function (error) {
                console.log(error);
            });


    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [userId]);


    useEffect(() => {
        axios.get(api.host+'/api/district',{headers:headers})
            .then(function (response) {

                console.log(response)
                setDistrict(response.data.data)


            })
            .catch(function (error) {
                console.log(error);
            });


    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])
    const deleteFunc = (id) => {
        address.map((a => {
            if (a.id === id) {
                address.splice(id,1)
            }
        }))
        setAddress(address)
        axios.delete(api.host+'/api/address/' + id,{headers:headers})
            .then(function (response) {
                console.log(response)
                toast.success("Successfully deleted")

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const [responseAddress, setResponseAddress] = useState(
        {
            userId:userId,
            name: "",
            districtId: "",
            landmark: "",
            houseNumber: "",
            entrance: "",
            flat: "",
            floor: "",
            latitude: "1",
            longitude: "1"

        });
    const [district, setDistrict] = useState([]);


    function handleChange(event) {
        const value = event.target.value;
        console.log(event.target.name)
        //  setResponseAddress({[event.target.name]:value})
        setResponseAddress({...responseAddress, [event.target.name]: value});
        //    console.log(event)
    }



    {
        console.log(responseAddress)
    }
    const reset = () => {

        setResponseAddress({
            userId: "",
            name: "",
            districtId: "",
            landmark: "",
            houseNumber: "",
            entrance: "",
            flat: "",
            floor: "",
            latitude: "",
            longitude: "",
        });

    };

    const [option, setOption] = useState([])

    function handleChangeSelectOption(event) {
        setOption(event.target.value)
        console.log(event.target.value + ' >>>>>>>')

    }

    responseAddress.districtId = option

    const addAddress = () => {
        axios.post(api.host+'/api/address', {
                userId: userId,
                name: responseAddress.name,
                districtId: responseAddress.districtId,
                landmark: responseAddress.landmark,
                houseNumber: responseAddress.houseNumber,
                entrance: responseAddress.entrance,
                flat: responseAddress.flat,
                floor: responseAddress.floor,
                latitude: "1",
                longitude: "1"

            },
            {headers: headers})
            .then(function (response) {

                toast.success("successfully added")
                console.log(response)
                window.location.href = "/address"

            })
            .catch(function (error) {

                console.log(error);
            });
    }


    return (

        <div>

            <CustomModal visible={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white w-96 p-5 rounded">
                    <h1 className="font-bold text-center text-2xl text-yellow-300">
                        Delivery location
                    </h1>


                    <p className="py-1 text-gray-500"> name </p>
                    <input
                        type="text"
                        name={'name'}
                        value={responseAddress.name}
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>


                    {/* <select onChange={() => onChangeHandler} id="default"
                            className="bg-gray-50 border mt-3 border-gray-300 text-black-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {district.map(d =>
                            <option id={d.id}>{d.name}</option>
                        )}
                    </select>*/}
                    <select id="countries" onChange={handleChangeSelectOption}
                            defaultValue={0}
                            className="bg-gray-50 border mt-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option
                            disabled value={0}>Select district
                        </option>
                        {district.map((d, i) => (

                            <option key={i} value={d.id}>{d.name}</option>

                        ))}
                    </select>


                    <p className="py-1 text-gray-500">
                        landmark
                    </p>
                    <input
                        type="text"
                        name={'landmark'}
                        value={responseAddress.landmark}

                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>
                    <p className="py-1 text-gray-500">
                        houseNumber
                    </p>
                    <input
                        type="number"
                        name={'houseNumber'}
                        value={responseAddress.houseNumber}

                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>
                    <p className="py-1 text-gray-500">
                        entrance
                    </p>
                    <input
                        type="number"
                        name={'entrance'}
                        value={responseAddress.entrance}

                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>
                    <p className="py-1 text-gray-500">
                        flat
                    </p>
                    <input
                        type="number"
                        name={'flat'}
                        value={responseAddress.flat}

                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>
                    <p className="py-1 text-gray-500">
                        floor
                    </p>
                    <input
                        type="number"
                        name={'floor'}
                        value={responseAddress.floor}


                        onChange={(e) => handleChange(e)}
                        className="w-full bg-white border border-black-500 p-1 mt-2 rounded "/>

                    <div className={'flex m-lg-5 justify-content-between'}>
                        <button

                            onClick={() => {
                                setShowModal(false);
                                addAddress();

                            }}
                            className="mt-6 mx-3 py-2 text-center rounded px-5 bg-blue-500 text-white">
                            Save address
                        </button>
                        <button

                            onClick={() => {
                                setShowModal(false);
                                reset();

                            }}
                            className="mt-6 mx-3 py-2 text-center rounded px-5 bg-red-500 text-white">
                            Cancel
                        </button>
                    </div>


                </div>
            </CustomModal>
            <div className={'ml-18'}>
                <button

                    onClick={() => setShowModal(true)}
                    className="mt-6  mx-3 py-2 text-center rounded px-5 bg-green-500 text-white">
                    add address
                </button>


            </div>

            {address?

<div>
            {address.map((a, i) => (

                <div key={i} className="my-12 max-w-screen-xl mx-auto px-6 justify-content-between flex flex-wrap ">

                    <div
                        className="bg-white border border-gray-100   duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg ">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{a.districtName}</h5>
                        <p className="text-gray-700 text-base ">
                            {a.name} {a.entrance}-{a.houseNumber}

                        </p>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p>Mo'ljal: {a.landmark}</p>
                        <button onClick={() => deleteFunc(a.id)} type="button"
                                className=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">delete
                        </button>

                    </div>
                </div>
            ))
            }
</div>:<div>
                    <p>Address mavjud emas</p>
                </div>}

        </div>
    );
};

export default Address;