import React from 'react'
import {Image} from "react-bootstrap";

const MainFooter = () => {
    // footer links 
    const FooterLinks = [
        { id: 1, text: 'About Online Food' },
        { id: 2, text: 'Read our blog' },
        { id: 3, text: 'Sign up to deliver' },
        { id: 4, text: 'Add your restaurant' },
        { id: 5, text: 'Get Help' },
        { id: 6, text: 'Ask any question' },
        { id: 7, text: 'Order Now' },
        { id: 8, text: 'Contact' },
        { id: 9, text: 'Facebook' },
        { id: 10, text: 'Instagram' },
        { id: 11, text: 'Twitter' },
        { id: 12, text: 'Youtube' },
    ]
    return (
        <div className="flex pb-8">
            {/* logo  */}
            <div className="flex flex-grow">
              <div>
                <Image className="w-50" src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/100/000000/external-burger-fast-food-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png" alt="logo" />
              </div>
                <div>
                <h1  className={'ml-12 mt-4 text-yellow-200 text-[54px]'}>Zukich food</h1>
                </div>
            </div>
            {/* footer links  */}

            <div className="flex space-x-12">
                <div className="flex flex-col space-y-2">
                    {FooterLinks.slice(0,4).map(item => (
                        <span className="text-white poppins" key={item.id}>{item.text}</span>
                    ))}
                </div>
                <div className="flex flex-col space-y-2">
                    {FooterLinks.slice(4,8).map(item => (
                        <span className="text-white poppins" key={item.id}>{item.text}</span>
                    ))}
                </div>
                <div className="flex flex-col space-y-2">
                    {FooterLinks.slice(8,12).map(item => (
                        <span className="text-white poppins" key={item.id}>{item.text}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainFooter
