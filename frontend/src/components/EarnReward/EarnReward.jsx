import React from "react";
import CarouselCard from "./EarnRewardCard"; 
import { Link } from "react-router-dom";

const EarnReward = ({ rewardData }) => {
  return (
    <div className="w-9/12 mx-auto">
      <div className="mb-4">
        <h1 className="text-left text-xl m-5 font-semibold">
          Earn Reward on Every Purchase
        </h1>
      </div>
      <CarouselCard data={rewardData} />
      <div className="text-right mt-4">
        <Link to="/rewards">
          <button className="bg-slate-300 text-black px-6 py-2 rounded-full mx-6">
            View All rewards
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EarnReward;
