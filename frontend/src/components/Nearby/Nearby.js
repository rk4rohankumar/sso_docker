import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./NearbyCard";

const FeaturedComponent = ({ FeatureData}) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleButtonClick = () => {
    if(inputValue !== ""){
      navigate(`/search/${inputValue}`);
    }
  };

  return (
    <div className="mx-auto">
      <div>
        {/* input box */}
        <div className="flex justify-center my-5 ">
          <input
            type="text"
            className="w-full h-14 border-2 border-white bg-gray-100 rounded-lg pl-5"
            placeholder="Search for local businesses"
            value={inputValue}
            onChange={handleChange} 
          />
          <button
            className="ml-3 px-4 py-2 bg-orange-500 text-white rounded-md"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </div>
      </div>
      <h2 className="ml-5 font-semibold text-xl mt-5">Nearby</h2>
      <Carousel data={FeatureData} />
    </div>
  );
};

export default FeaturedComponent;
