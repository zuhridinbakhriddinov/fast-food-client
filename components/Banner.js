import React from 'react';
import {useRouter} from "next/router";
import en from "../locales/en/en";
import uz from "../locales/uz/uz";
const Banner = () => {

    const router = useRouter();
    const {locale} = router;
    const t = locale === 'en' ? en : uz;

    return (
        <section className="header-banner   h-96 w-full bg-yellow-50">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-gray-700">{t.Best_food_waiting_for_your_belly}</h1>

                <div className="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center">
                    <input type="text" className=" rounded-full px-4 focus:outline-none w-full bg-transparent" placeholder={t.search_dot} />
                    <button className="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 ">{t.search}</button>
                </div>
            </div>
        </section>
    );
};

export default Banner;