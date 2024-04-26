import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselCard = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="hover:cursor-pointer">
      {data
        .filter(
          (item) =>
            item._id === "660ff2f6a7f1f71128345a07" ||
            item._id === "660ef17440fb81aeb5c695f5" ||
            item._id === "660ff5e0a7f1f71128345a1f" ||
            item._id === "660ff3bfa7f1f71128345a13" ||
            item._id === "660ff6b5a7f1f71128345a36"
        )
        .sort((a, b) => {
          // Convert _id strings to numbers for comparison
          const idA = parseInt(a._id.replace(/^0+/, ''), 16);
          const idB = parseInt(b._id.replace(/^0+/, ''), 16);
          return idB - idA; // Sort in descending order
        })
        .map((item, index) => (
          <Link to={`/business/${item._id}`} key={item._id}>
            <Card {...item} />
          </Link>
        ))}
    </Slider>
  );
  
  
};

const Card = ({ logo, businessName, description }) => {
  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded overflow-hidden shadow-lg m-2">
      <img className="w-full h-40" src={logo} alt="Card background" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{businessName}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
