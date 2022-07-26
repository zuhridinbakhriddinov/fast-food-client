import React from 'react';

const AboutMe = () => {
    return (
        <div>
            <p className={'ml-10 text-black-500 text-center mt-10 text-2xl  font-semibold'}>My information</p>
            <div className="w-1/4  ml-10 mb-20 mt-20 p-20  rounded-lg shadow-xl bg-white ">

                <header className=" text-2xl font-extrabold py-4 px-4 text-center">
                   Zuhridin
                </header>
                <div>
                    <ul className="text-gray-500 text-center font-semibold">
                        <li>Phone Number</li>
                        <li>+998 93 087 03 08</li>
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default AboutMe;