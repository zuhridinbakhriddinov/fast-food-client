import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {getFoods} from "../utils/ApiUtils";
import {useRouter} from "next/router";
import en from "../locales/en/en";
import uz from "../locales/uz/uz";
import {headers, lan} from "../constants/api";

const Context = createContext();


export const FoodProvider = ({children}) => {


    const router = useRouter();
    const {locale} = router;
    const t = locale === 'en' ? en : uz;
    console.log(t)
    let url = "https://fast-food-app-server.herokuapp.com/api/v1/food/getFoods/" + lan
    useEffect(() => {


        /* getFoods()*/
        axios.get(url, {headers: headers})
            .then(response => {
                console.log(response)
                const dataFromServer = response.data.data;
                setFoodList(dataFromServer)
            })
            .catch(error => {
                console.log(error)
            })

    }, [url])

    const [foodList, setFoodList] = useState([]);


    return (
        <Context.Provider value={
            [foodList, setFoodList]
        }>{children}</Context.Provider>
    );
};

export const useFoodContext = () => {
    return useContext(Context)
}

