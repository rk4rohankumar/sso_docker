import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { getDatabyID } from "../../utils/APIs";

const BusinessPage = ({ id }) => {
  const [businessData, setBusinessData] = useState({});
  const location = useLocation();
  const ab = location.pathname;

  id = ab.slice(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${getDatabyID}${id}`);
      const json = await response.json();
      setBusinessData(json.data);
    };

    fetchData();
  }, [id]);

  const {
    businessName,
    businessAddress,
    pinCode,
    category,
    description,
    rewardTitle,
    rewardType,
    rewardValue,
    email,
    countryCode,
    phoneNumber,
    website,
    logo,
    timings,
  } = businessData;

  const generateWhatsAppLink = () => {
    const whatsappNumber = `${countryCode}${phoneNumber}`;
    return `https://wa.me/${whatsappNumber}`;
  };

  const generatePhoneCallLink = () => {
    return `tel:${countryCode}${phoneNumber}`;
  };

  const generateAddressLink = () => {
    return `https://www.google.com/maps/search/?api=1&query=${businessAddress}+${pinCode}`;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4 md:mb-0">
              {businessName}
            </h2>
            <img
              className="w-24 h-24 object-cover rounded-full mb-4 md:mb-0"
              src={logo}
              alt="Business Logo"
            />
          </div>
          <hr className="my-4" />
          <div>
            <h3 className="text-lg font-semibold">Business Information</h3>
            <p>
              <strong>Category :</strong> {category}
            </p>
            <p>
              <strong>Timings :</strong> {timings}
            </p>
            <p>
              <strong>Email :</strong> {email}
            </p>
            <p>
              <strong>Phone :</strong> {countryCode} {phoneNumber}
            </p>
            <p>
              <strong>Address :</strong> {businessAddress}, {pinCode}
            </p>
            <div className="flex flex-col md:flex-row justify-between my-8">
              <a
                href={generatePhoneCallLink()}
                className="flex items-center btn-call bg-blue-400 text-white py-2 px-4 rounded mb-4 md:mb-0 md:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPhone className="mr-2" />
                Call Now
              </a>
              <a
                href={generateWhatsAppLink()}
                className="flex items-center btn-whatsapp bg-green-500 text-white py-2 px-4 rounded mb-4 md:mb-0 md:mr-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2" />
                Chat on WhatsApp
              </a>
              {website && (
                <a
                  href={generateAddressLink()}
                  className="flex items-center btn-website bg-purple-400 text-white py-2 px-4 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Address
                </a>
              )}
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Reward:</strong> {rewardTitle} - {rewardType} -{" "}
              {rewardValue}
            </p>
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
