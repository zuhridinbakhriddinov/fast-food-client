import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

const Context = createContext();


export const FoodProvider = ({children}) => {
    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/food')
            .then(response => {
                /*   console.log(response)*/
                const dataFromServer = response.data;
                setFoodList(dataFromServer)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    const [foodList, setFoodList] = useState([ ]);



    return (
        <Context.Provider value={
            [foodList, setFoodList]
        }>{children}</Context.Provider>
    );
};

export const useFoodContext = () => {
    return useContext(Context)
}

