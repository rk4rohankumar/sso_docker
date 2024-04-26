import React, { useState, useEffect } from "react";
import { editData, getAllUsersData, deleteDataById } from "../../utils/APIs";

const AdminPanel = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [id, setId] = useState();
  const handleSelectBusiness = (business) => {
    setSelectedBusiness({ ...business, id: business._id });
    setId(business._id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${getAllUsersData}`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setBusinesses(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBusiness((prevBusiness) => ({
      ...prevBusiness,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${editData}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedBusiness),
      });
      if (response.ok) {
        alert("Data updated successfully");
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data. Please try again.");
    }
  };


  const handleDelete = async () => {
 

    try {
      const response = await fetch(`${deleteDataById}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Deletion successful
        alert("Data deleted successfully");
        fetchData();
      } else {
        // Deletion failed
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error occurred during deletion:", error);
    } finally {
    }
  };
  return (
    <div className="flex justify-between">
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Businesses</h2>
        <ul>
          {businesses.map((business, index) => (
            <li
              key={index}
              onClick={() => handleSelectBusiness(business)}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md mb-2"
            >
              {business.businessName}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4">
        {selectedBusiness && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {selectedBusiness.businessName}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries(selectedBusiness).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block font-semibold">
                    {key}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md ml-8"
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
