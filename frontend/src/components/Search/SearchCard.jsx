import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ logo, businessName, description, category, _id }) => {
  return (
    <Link to={`/business/${_id}`} className="hover:cursor-pointer">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm m-5 flex">
        <div className="w-1/3">
          <img
            className="w-full h-full object-cover object-center rounded-l-lg"
            src={logo}
            alt="Business Logo"
          />
        </div>
        <div className="w-2/3 p-4">
          <h3 className="text-xl font-semibold mb-2">{businessName}</h3>
          <p className="text-gray-600 mb-2">{category}</p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
