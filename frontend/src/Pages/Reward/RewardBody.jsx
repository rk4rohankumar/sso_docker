import React from "react";

const HomeLandingCard = () => {
  return (
    <div className="w-full mx-auto my-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {/* Background Image */}
        <div
          className="bg-cover bg-center w-full h-72 md:h-96"
          style={{
            backgroundImage: "url('https://i.ibb.co/RcnQV20/6.jpg')",
          }}
        ></div>
        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 bg-gray-200 bg-opacity-30 backdrop-filter flex flex-col justify-end items-start p-4">
          {" "}
          {/* Changed justify-center to justify-end and items-center to items-start */}
          {/* Heading */}
          <h2 className="text-white text-2xl md:text-5xl font-bold text-left">
            Earn Reward points to unlock Local Cashbacks And Gift Cards At
            Nearby Stores.
          </h2>
          {/* Content */}
          <div className="p-4  rounded-md mt-6  md:max-w-lg">
            {/* Search Bar */}
            <div className="">
              <button className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg ml-2 md:ml-0">
                Claim Your reward
              </button>
            </div>
            {/* Other content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLandingCard;
