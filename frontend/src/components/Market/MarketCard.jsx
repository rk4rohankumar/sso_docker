import React from "react";

const SmallCard = ({ image, heading, description ,address}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm">
      <img
        className="w-full h-32 object-cover object-center rounded-t-lg"
        src={image}
        alt="Card"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{heading}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default SmallCard;
