import React from "react";
import CarouselCard from "./ShoplocalCard";
import { Link } from "react-router-dom";

const EarnReward = ({ EarnRewardData }) => {
  return (
    <div className="w-9/12 mx-auto">
      <div className="mb-4">
        <h1 className="text-left text-xl m-5 font-semibold ">Shop Local</h1>
      </div>
      <CarouselCard data={EarnRewardData} />

      {/*Add button to view all rewards */}
      <div className="text-right mt-4 lg:my-8">
        <Link to="/business">
          <button className="bg-slate-300 text-black px-6 py-2 rounded-full mx-2 sm:mx-8 lg:mx-6">
            View All rewards
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EarnReward;
