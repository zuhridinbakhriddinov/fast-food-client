import React, {useEffect, useState} from 'react';
import MenuItem from "./MenuItem";
import axios from "axios";
import {useCartContext} from "../../context/cart";
import {useFoodContext} from "../../context/food";


/*const MenuList = () => {




    const [foodList, setFoodList] = useFoodContext();





    return (


        foodList.map((categories, index) => (


            <div key={index}>
                <h1 className="italic hover:not-italic font-bold text-lg">{categories.categoryName}</h1>
                <div className="flex flex-wrap mx-3 overflow-hidden sm:-mx-3 md:-mx-3 lg:-mx-3 xl:-mx-6">
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


};*/
const MenuList = () => {

    const [foodList, setFoodList] = useFoodContext();


    return (
 /*       <section className="my-12 max-w-screen-xl mx-auto px-6">
            {/!* food Menu tab  *!/}
            <div className="flex items-center justify-center space-x-6">
                <p className={menuTab === 'Breakfast' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('Breakfast')}>Breakfast</p>
                <p className={menuTab === 'Lunch' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('Lunch')}>Lunch</p>
                <p className={menuTab === 'Dinner' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"} onClick={() => handleMenuTabs('Dinner')}>Dinner</p>
            </div>

            {/!* all foods  *!/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                {foods.filter((item) => menuTab === item.foodType).map(item => (
                    loading ? <Skeleton key={item._id} /> : <FoodItem key={item._id} {...item} />
                ))}
            </div>
        </section>*/


        foodList.map((categories, index) => (


                <div key={index}>
                {/*  <h1 className=" font-bold text-3xl ml-10 ">{categories.categoryName}</h1>*/}
                    <div className="my-12 max-w-screen-xl mx-auto px-6 flex flex-wrap">
                        {
                            categories.foodInfo.map((food, i) => (
                                <div key={i}
                                     className=" m-8  overflow-hidden lg:my-1 lg:px-1 lg:w-1/4 xl:my-1 xl:px-1 xl:w-1/4">

                                    <MenuItem
                                        id={food.foodId}
                                        name={food.name}
                                        price={food.price}
                                        imgId={food.imageId}
                                        foodType={categories.categoryName}

                                    />
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

