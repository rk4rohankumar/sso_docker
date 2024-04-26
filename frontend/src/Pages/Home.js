import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeLandingCard from "./HomeLandingCard";
import EarnReward from "../components/EarnReward/EarnReward";
import Shoplocal from "../components/Shoplocal/Shoplocal";
import Trending from "../components/Trending/Trending";
import { getAllUsersData } from "../utils/APIs";

const Home = () => {
  // const [dataFromChild, setDataFromChild] = useState(null);
  const [originalRewardData, setOriginalRewardData] = useState([]);
  const [found, setFound] = useState(true);

  useEffect(() => {
    fetchRewardData();
  }, []);

  const fetchRewardData = async () => {
    try {
      const response = await fetch(
        `${getAllUsersData}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOriginalRewardData(data.data);
      } else {
        throw new Error("Failed to fetch reward data");
      }
    } catch (error) {
      console.error("Error fetching reward data:", error);
    }
  };

  return found ? (
    <div>
      <div className="container mx-auto flex justify-center mt-6">
        <HomeLandingCard />
      </div>
      <EarnReward rewardData={originalRewardData} />
      <Shoplocal EarnRewardData={originalRewardData} />
      <Trending TrendingData={originalRewardData} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold mb-4 text-red-600">NO DATA FOUND</div>
      <Link to="/">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={() => {
            setFound(true);
          }}
        >
          Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default Home;
