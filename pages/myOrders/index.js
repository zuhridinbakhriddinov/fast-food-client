import React from 'react';
import MyOrders from "../../components/MyOrders";
import Nav from "../../components/Nav";

const Index = () => {
    return (
        <div>
            <Nav/>

            <header>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                 <a href={'/myOrders'}>In progress... </a>
                </button>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <a href={'/orderHistory'}>Order History </a>
                </button>
            </header>
           <MyOrders/>

        </div>
    );
};

export default Index;