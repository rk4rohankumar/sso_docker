import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { IoIosNotificationsOutline } from "react-icons/io";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white ">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to='/' className="flex-shrink-0">
                        <img className="h-8" src="https://i.ibb.co/LJqgmcq/localmamalogojpeg.jpg" alt="Logo" />
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <input className="bg-gray-100 focus:bg-white border border-gray-300 rounded-lg py-2 px-4" type="text" placeholder="Search..." />
                        <a href="#" className="text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
                            {/* <IoIosNotificationsOutline style={{ fontSize: '24px' }} /> */}

                        </a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleNavbar} className="text-gray-400 hover:text-gray-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <input className="bg-gray-100 focus:bg-white border border-gray-300 rounded-lg py-2 px-4 w-full" type="text" placeholder="Search..." />
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2h-2m-4 0V7m0 3v10a2 2 0 002 2h6a2 2 0 002-2V10m-8 4v4m4-4v4"></path></svg>
                        </a>
                        <a href="#" className="text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
