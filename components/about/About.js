import React from 'react';
import Link from "next/link";

const About = () => {
    return (
        <div>
            <div className="text-black font-bold fs-1 text-center mb-4 mt-7 text-5xl">
                Toshkent markazida joylashgan Zukich food <br/> oilaviy milliy fast food oshxonasi
            </div>


            <div className="justify-start flex">

                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOsi0UvWXGifCtV7AQrGTm1BkE3sPY8Jf6Q&usqp=CAU" className="ml-60 d-block w-80 h-60 mt-20 rounded-2xl " alt="..."/>
                </div>



                <div>
                    <div className="text-black font-bold mt-20 ml-24 text-xl">Milliy fast food oshxonasi</div>
                    <br/>


                    <div className=" ml-24"> Ресторан энг янги салатлар ва шўрваларни таклиф этади:
                        анъанавий, <br/> баҳаратлı,
                        иссиқ, маркали - улар ҳар қандай версияда ажойиб ва <br/>ҳар ким ўз таъмининг
                        ажойиб комбинациясини топади. Ресторан ёки уйда<br/> столда таомларимиздан баҳраманд бўлиш
                        ёқимли.
                    </div>


                    <div className="my-56 ml-0 mt-2">
                        <Link href="http://localhost:3000/">
                            <button
                                className=" bg-red-500 text-white  py-2 px-12 rounded ml-24 mt-6 hover:scale-110">Menyuni
                                ko'rish
                            </button>
                        </Link>

                    </div>
                </div>
            </div>


        </div>

    );
};

export default About;