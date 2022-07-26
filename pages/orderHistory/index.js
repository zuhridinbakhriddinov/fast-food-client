import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "../../components/ui/Button";
import Nav from "../../components/Nav";

const Index = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    let token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

  



    useEffect(() => {
        console.log(page + ' shu page ')
        axios.get(`http://localhost:8081/order/orderHistory?page=${page}`, {headers: headers})
            .then(function (response) {

                console.log(response.data.data.content)
                setTotalPages(response.data.data.totalPages)
                console.log(totalPages)
                setOrderHistory(response.data.data.content)


            })
            .catch(function (error) {
                console.log(error);
            });


    }, [page, totalPages]);


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


                {totalPages?
                    <div>
            <div className="relative w-50 h-50 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Order number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total sum
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderHistory.map((items, i) => (
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {items.orderNumber}
                            </th>
                            <td className="px-6 py-4">
                                {items.date}
                            </td>
                            <td className="px-6 py-4">
                                {items.payType}
                            </td>
                            <td className="px-6 py-4">
                                {items.status}
                            </td>
                            <td className="px-6 py-4">
                                {items.sum}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <footer className={'w-50 h-50 m-8 pt-40'}>
                {page < 2 ?
                    <Button disabled
                            onClick={() => setPage(page - 1)}>orqaga</Button>
                    :
                    <Button
                        onClick={() => setPage(page - 1)}>orqaga</Button>
                }
                {console.log(page + ' page')}
                {console.log(totalPages + ' totalPage')}
                {
                    totalPages > page ?
                        <Button onClick={() => setPage(page + 1)}>oldinga</Button> :
                        <Button disabled onClick={() => setPage(page + 1)}>oldinga</Button>
                }
                {console.log(totalPages >= page)}

            </footer>
            </div>
            : <div>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h2 className={'text-red-600 text-xxl ml-4 mt-2'}>you don't order yet</h2>
                    </div>
            }


        </div>
    );
};

export default Index;