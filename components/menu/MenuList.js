import React, {useEffect, useState} from 'react';
import MenuItem from "./MenuItem";
import axios from "axios";
import {useCartContext} from "../../context/cart";
import {useThemeContext} from "../../context/theme";
import {useFoodContext} from "../../context/food";


const MenuList = () => {


    const [theme, setTheme] = useThemeContext();


    const [foodList, setFoodList] = useFoodContext();





    return (


        foodList.map((categories, index) => (


            <div key={index}>
                <h1 className="italic hover:not-italic font-bold text-lg">{categories.categoryName}</h1>
                <div className="flex flex-wrap -mx-3 overflow-hidden sm:-mx-3 md:-mx-3 lg:-mx-3 xl:-mx-6">
                    {
                        categories.foodInfo.map((food, i) => (
                            <div key={i}
                                 className="my-3 px-3 w-1/2 overflow-hidden sm:my-3 sm:px-3 sm:w-1/3 md:my-3 md:px-3 md:w-1/3 lg:my-3 lg:px-3 lg:w-1/4 xl:my-6 xl:px-6 xl:w-1/4">

                                <MenuItem
                                          id={food.foodId}
                                          name={food.name}
                                          price={food.price}
                                          imgId={food.imageId}/>
                            </div>
                        ))
                    }
                </div>


            </div>
        )
        )

    );


};

export default MenuList;

