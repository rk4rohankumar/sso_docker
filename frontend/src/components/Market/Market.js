import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetAllData from "../../utils/useGetAllData";
import SmallCard from "./MarketCard";

// Custom hook to fetch data
const useFetchData = () => {
  const allData = useGetAllData();
  return allData;
};

const Market = () => {
  const [loading, setLoading] = useState(true); 
  const allData = useFetchData(); 

  // State to hold filtered data based on pincode
  const [filteredData, setFilteredData] = useState([]);
  const [inputPincode, setInputPincode] = useState("");

  useEffect(() => {
    if (allData) {
      setLoading(false);
    }
  }, [allData]);

  useEffect(() => {
    // Show all data if no input pincode is provided
    if (inputPincode.trim() === "") {
      setFilteredData(allData);
    } else {
      // Filter data based on input pincode
      const sortedData = allData.filter((item) =>
        item.pinCode.toString().startsWith(inputPincode)
      );
      setFilteredData(sortedData);
    }
  }, [allData, inputPincode]);

  const handleInputChange = (e) => {
    setInputPincode(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state if data is still being fetched
  }

  return (
    <div className="w-9/12 mx-auto my-5">
      {/* Input field to enter pincode */}
      <div className="flex justify-center mb-4">
        <input
          type="number"
          value={inputPincode}
          onChange={handleInputChange}
          placeholder="Enter pincode"
          className="border border-gray-400 rounded-md px-4 py-2 mr-2"
        />
        <button
          onClick={() => setInputPincode("")}
          className="border border-gray-400 rounded-md px-4 py-2"
        >
          Clear
        </button>
      </div>

      {/* Display filtered data */}
      <div className="flex flex-wrap justify-center gap-4">
        {filteredData.map((card) => (
          <Link
            key={card.id}
            to={`/business/${card._id}`}
            className="hover:cursor-pointer"
          >
            <SmallCard
              image={card.logo}
              heading={card.heading}
              description={card.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Market;
