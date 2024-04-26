import React from "react";
import Carousel from "./FeaturedCard";

const FeaturedComponent = ({FeatureData}) => {
  return (
    <div className=" mx-auto">
      <h2 className="ml-5 text-xl font-semibold">Featured </h2>
      <Carousel data={FeatureData} />
    </div>
  );
};

export default FeaturedComponent;
