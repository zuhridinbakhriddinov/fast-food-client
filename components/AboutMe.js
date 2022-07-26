import React, {useEffect, useState} from 'react';
import axios from "axios";

const AboutMe = () => {
    let token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const[user,setUser]=useState();
    useEffect(() => {
        axios.get('https://fast-food-app-server.herokuapp.com/api/v1/auth/me',{headers:headers})
            .then(function (response) {

                console.log(response)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                setUser(response.data.data)


            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);



    return (
        <div>
            <p className={'ml-10 text-black-500 text-center mt-10 text-2xl  font-semibold'}>My information</p>
            <div className="w-1/4  ml-10 mb-20 mt-20 p-20  rounded-lg shadow-xl bg-white ">

                <header className=" text-2xl font-extrabold py-4 px-4 text-center">
                    {user.fullName}
                </header>
                <div>
                    <ul className="text-gray-500 text-center font-semibold">
                        <li>Phone Number</li>
                        <li>{user.phoneNumber}</li>
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default AboutMe;