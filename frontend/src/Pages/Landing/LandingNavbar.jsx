import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left portion - Brand logo */}
                <Link to='/' className="flex items-center">
                    <img src="https://i.ibb.co/LJqgmcq/localmamalogojpeg.jpg" alt="Brand Logo" className="h-8 mr-2" />
                    <span className="text-gray-800 text-lg font-bold">Local Mama</span>
                </Link>

                {/* Right portion - Navigation links and buttons */}
                <div className="flex items-center">
                    <ul className="flex items-center space-x-6">
                        <li><Link to="/home" className="text-gray-800 hover:text-blue-600">Home</Link></li>
                        <li><a href="/business" className="text-gray-800 hover:text-blue-600">Business</a></li>
                        <li><a href="/rewards" className="text-gray-800 hover:text-blue-600">Rewards</a></li>
                        <li><a href="/faq" className="text-gray-800 hover:text-blue-600">FAQ</a></li>
                    </ul>
                    <Link to='/'>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full ml-4">Login</button>
                    </Link>
                    <Link to='/signup'><button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full ml-2">Signup</button></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
