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
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
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
    <Slider {...settings}>
      {data.map((item, index) => (
        <Link to={`/business/${item._id}`} className="hover:cursor-pointer">
          <SmallCard key={index} {...item} />
        </Link>
      ))}
    </Slider>
  );
};

const SmallCard = ({ logo, businessName, rating, deliveryTime }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg  m-5">
      <img
        className="w-full h-32 object-cover object-center rounded-t-lg"
        src={logo}
        alt="Card"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{businessName}</h3>
        <div className="flex ">
          <p className="mr-2 text-gray-600">{rating}</p>
          <p className="mr-2 text-gray-600">{deliveryTime}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
