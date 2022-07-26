import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import moment from "moment";
import Button from "../ui/Button";
import {Image} from "react-bootstrap";

const PreparingOrders = () => {

    const [recentlyOrders, setRecentlyOrders] = useState([]);
    let token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();


    useEffect(() => {
        axios.get(`http://localhost:8081/api/cook/getPreparedOrders?page=${page}`, {headers: headers})
            .then(function (response) {

                console.log(response)
                setTotalPages(response.data.data.totalPages)
                console.log(totalPages)
                setRecentlyOrders(response.data.data.content)
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [page, totalPages]);

    function changeReady(id) {

        axios.post(`http://localhost:8081/api/cook/readyOrder/` + id, {headers: headers})
            .then(function (response) {

                toast.success(response.data.message)
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
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
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ready
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentlyOrders.map((items, i) => (
                        <tr key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {items.orderNumber}
                            </th>
                            <td className="px-6 py-4">

                                {moment(items.date).format("LLL")}
                            </td>
                            <td className="px-6 py-4">
                                {items.name}
                            </td>
                            <td className="px-6 py-4">
                                {items.quantity}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => changeReady(items.id)} className={'w-10 h-10'}>
                                    <Image
                                        alt="..."   src={'success2.png'}/></button>
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
    );
};

export default PreparingOrders;