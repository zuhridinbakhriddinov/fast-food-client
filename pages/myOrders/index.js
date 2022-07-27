import React from 'react';
import MyOrders from "../../components/MyOrders";
import Nav from "../../components/Nav";
import Link from "next/link";

const Index = () => {
    return (
        <div>
            <Nav/>

            <header>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                 <Link href={'/myOrders'}>In progress... </Link>
                </button>

                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <Link href={'/orderHistory'}>Order History </Link>
                </button>
            </header>
           <MyOrders/>

        </div>
    );
};

export default Index;