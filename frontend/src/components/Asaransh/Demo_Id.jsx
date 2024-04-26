import React from "react";
import useGetAllData from "../../utils/useGetAllData";
import { Link } from "react-router-dom";
const Demo_Id = () => {
  const data = useGetAllData();
  return (
    <div>
      this is Demo_Id component
      {data &&
        data.map((item) => {
          return (
            <div key={item._id} className="flex  ml-16">
              <h1 className="pt-2">{item.name}</h1>
              <Link to={`/business/${item._id}`}>
                <p className="pt-2">{item.email}</p>
              </Link>
              <p className="pt-2">{item.phone}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Demo_Id;
