import React from 'react';
import UnreadyOrders from "./UnreadyOrders";

const Cook = () => {
    return (
        <div>
            <header>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <a href={'/cook'}>Unready Orders </a>
                </button>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <a href={'/preparingOrders'}>Preparing orders </a>
                </button>
            </header>
            <UnreadyOrders/>



        </div>
    );
};

export default Cook;