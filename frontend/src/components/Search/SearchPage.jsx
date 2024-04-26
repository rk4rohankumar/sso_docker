import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "./SearchCard";
import { getAllUsersData } from "../../utils/APIs";

const SearchPage = () => {
  const [originalRewardData, setOriginalRewardData] = useState([]);
  const [filteredRewardData, setFilteredRewardData] = useState([]);
  const [found, setFound] = useState(true);

  const location = useLocation();
  let ab = location.pathname;
  ab = decodeURIComponent(ab);

  const query = ab.slice(8);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await fetch(`${getAllUsersData}`, {
          method: "POST",
        });

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

    fetchRewardData();
  }, []);

  useEffect(() => {
    // Filter data when originalRewardData or query changes
    if (originalRewardData.length > 0) {
      const filteredData = originalRewardData.filter(
        (item) =>
          item.businessName.toLowerCase().startsWith(query.toLowerCase()) ||
          item.category.toLowerCase().startsWith(query.toLowerCase()) ||
          item.description.toLowerCase().startsWith(query.toLowerCase())
          );
      setFilteredRewardData(filteredData);
      setFound(filteredData.length > 0);
    }
  }, [originalRewardData, query]);

  const searchFound = (
    <div className="text-3xl ml-6 font-bold">Search results for {query}</div>
  );

  return (
    <div className="ml-12">
      {searchFound}
      {found ? (
        filteredRewardData.map((card) => (
          <SearchCard
            _id={card._id}
            key={card._id}
            logo={card.logo}
            businessName={card.businessName}
            category={card.category}
            description={card.description}
          />
        ))
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <div className="text-3xl font-bold mb-6 mt-40">
            No results found for {query}
          </div>
          <div className="text-2xl font-bold">
            Try searching for something else
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
