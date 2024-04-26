import React, { useState, useEffect } from "react";
import Nearby from "../../components/Nearby/Nearby";
import Featured from "../../components/Featured/Featured";
import RewardBody from "./RewardBody";
import { getAllUsersData } from "../../utils/APIs";

const HomeLandingCard = () => {
  const [featureData, setFeatureData] = useState([]);
  const [filteredFeatureData] = useState([]);

  useEffect(() => {
    fetchFeatureData();
  }, []);

  const fetchFeatureData = async () => {
    try {
      const response = await fetch(
        `${getAllUsersData}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeatureData(data.data);
      } else {
        throw new Error("Failed to fetch feature data");
      }
    } catch (error) {
      console.error("Error fetching feature data:", error);
    }
  };


  return (
    <div className="w-full md:w-9/12 lg:w-7/12 xl:w-9/12 mx-auto">
      <RewardBody />
      <Nearby FeatureData={filteredFeatureData.length ? filteredFeatureData : featureData} />
      <Featured FeatureData={filteredFeatureData.length ? filteredFeatureData : featureData} />
    </div>
  );
};

export default HomeLandingCard;
