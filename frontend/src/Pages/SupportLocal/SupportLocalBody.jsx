import React, { useState } from "react";
// import { FiSearch } from 'react-icons/fi'; 
import {useNavigate} from 'react-router-dom';

const HomeLandingCard = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if(inputValue !== ""){

    navigate(`/search/${inputValue}`);
  }
    // sendDataToParent(inputValue);
  };

  return (
    <div className="w-full md:w-9/12 lg:w-7/12 xl:w-9/12 mx-auto my-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <div
          className="bg-cover bg-center w-full h-72 md:h-96"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/4Z6Rm7V/2.jpg')",
          }}
        ></div>
        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-filter flex flex-col justify-end items-start p-4">
          {" "}
          {/* Heading */}
          <h2 className="text-white text-4xl md:text-6xl font-bold text-left">
            Support Local business
          </h2>
          <h2 className="text-white mt-4 font-bold text-left">
            Earn rewards for your purchases. Start by searching for a business
            or service
          </h2>
          {/* Content */}
          <div className="p-4 bg-white rounded-md mt-6 w-full md:max-w-lg">
            {/* Search Bar */}
            <div className="relative flex items-center">
              {/* Search icon */}
              {/* <FiSearch className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ fontSize: '1.5rem' }} /> */}
              <input
                type="text"
                placeholder="Search for business and services..."
                className="w-full bg-transparent px-12 py-2 pl-12 rounded-full focus:outline-none"
                style={{ paddingRight: "3rem" }} 
                onChange={handleChange}
              />
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded ml-2 md:ml-0"
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLandingCard;
