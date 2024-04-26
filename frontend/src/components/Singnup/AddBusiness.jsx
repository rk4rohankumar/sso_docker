import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../../utils/APIs";
import { useAuth0 } from "@auth0/auth0-react";

const AddBusiness = () => {
  const navigate = useNavigate();
  const { loginWithRedirect,isAuthenticated } = useAuth0();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    timings: "",
    pinCode: "",
    category: "",
    description: "",
    rewardName: "",
    rewardDescription: "",
    rewardDetail: "",
    rewardType: "",
    rewardValue: "",
    email: "",
    password: "",
    countryCode: "+91",
    phoneNumber: "",
    website: "",
    termsAgreed: false,
    logoImg: null,
  });

  const categories = [
    "AC SERVICE",
    "AMBULANCE SERVICE",
    "ASTROLOGERS",
    "AUTO MOBILE",
    "AYURVEDIC DOCTORS",
    "B2B",
    "BABY CARE",
    "BALLON DECORATORS",
    "BANQUETS",
    "BEAUTY",
    "BIRTH DAY PARTY ORGANIZERS",
    "BONE& joint doctors",
    "bore well contractors",
    "bridal makeup",
    "builders contractors",
    "bulk sms",
    "bus on hire",
    "cctv",
    "car rental",
    "cake shops",
    "car insurance agents",
    "car loan",
    "car repair",
    "cardioligists",
    "carpenters",
    "contractors",
    "caters",
    "ca",
    "child specialist",
    "civil contractors",
    "cleaning services",
    "computer repairs",
    "computer training institues",
    "consulatants",
    "daily needs",
    "dance & music",
    "day care centers",
    "decorators",
    "dentitsts",
    "dermalatology",
    "detective agencies",
    "diabetologists",
    "daigonistic centers",
    "dietitians",
    "doctors",
    "ent doctors",
    "educttion",
    "eletrical contractors",
    "eletricians",
    "event organizers",
    "eye doctors",
    "false ceiling",
    "fire extingusher",
    "fitness",
    "flex printing services ",
    "florists",
    "foreign exchange",
    "furniture",
    "gst registeration",
    "gastroenterologists",
    "general phyisican doctors",
    "general surgeons",
    "generators",
    "groceries",
    "gyms",
    "gyanacalogy ",
    "hearing aids",
    "home services",
    "home tutor",
    "homeopathy",
    "hostels",
    "hotels",
    "house keeping",
    "housing loan",
    "income tax consultation",
    "insurance",
    "interior designers",
    "international courier services",
    "internet",
    "jobs",
    "kindergartens",
    "langauge classes",
    "lapTop repairs",
    "lawyers",
    "loans",
    "logistics",
    "makeup artists",
    "matrimonial",
    "medicines",
    "modular kitchen",
    "mototr training schools",
    "movies",
    "neurologists",
    "nurse bureaus",
    "online passport agents",
    "ophthalmologists",
    "opticians",
    "orthapadeic doctors",
    "overseas education",
    "pg accomodations",
    "packers & movers",
    "paediatricians",
    "painting ",
    "party",
    "party ornganizers",
    "pathologyy labs",
    "personal loans",
    "pest control",
    "pet& pet care",
    "photographers",
    "physiotherapists",
    "playgroups",
    "plumber",
    "ready mix concrete",
    "real estate",
    "refrigr rapirs",
    "registeration consulations",
    "rent & hire",
    "repair & services",
    "restuarants",
    "security &cctv",
    "shop online",
    "skin & hair doctors",
    "skin doctors",
    "t shirt printers",
    "tatoo artists",
    "taxi",
    "tempos on hire",
    "tent house",
    "towing service",
    "train ticketing",
    "training insituties",
    "transporters",
    "travel",
    "tutorials",
    "visa assiatance",
    "wall papers",
    "water suppliers",
    "waterproofing contractors",
    "website designers",
    "wedding requisites",
    "weight loss centre's ",
    "yoga classes",
  ];
  const rewardTypes = [
    "Reward Points",
    "Discounts",
    "Buy one Get one Deal",
    "Cashback",
    "Exclusive offer",
    "Loyalty Rewards",
    "Freebies",
    "Giftcards",
  ];
  const rewardValues = ["50", "100", "200", "500"];
  const countryCodes = ["+91", "+1", "+44", "+61"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData({ ...formData, termsAgreed: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${registerBusiness}`,
        formDataToSend
      );
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || isLoggedIn||isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || isLoggedIn) {
      alert("You have already signed up, try logging in");
      navigate("/");
    }
  }, [navigate,isLoggedIn]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Add a Business
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="businessName" className="block font-semibold mb-1">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter business name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timings" className="block font-semibold mb-1">
            Timing*
          </label>
          <input
            type="text"
            id="timings"
            name="timings"
            value={formData.timings}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter Timing"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="businessAddress" className="block font-semibold mb-1">
            Business Address *
          </label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter business address"
          />
          <label htmlFor="businessAddress" className="block font-semibold mb-1">
            Pincode *
          </label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
            title="Please enter a  number"
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter pincode"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter business description"
          ></textarea>
        </div>
        <h2 className="text-xl font-semibold mb-4">Add Reward</h2>
        <div className="mb-4">
          <label htmlFor="rewardName" className="block font-semibold mb-1">
            Reward Name *{" "}
          </label>
          <input
            type="text"
            id="rewardName"
            name="rewardName"
            value={formData.rewardName}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter reward name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rewardDescription"
            className="block font-semibold mb-1"
          >
            Reward Description *{" "}
          </label>
          <textarea
            id="rewardDescription"
            name="rewardDescription"
            value={formData.rewardDescription}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter reward description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="rewardDetail" className="block font-semibold mb-1">
            Reward Detail{" *"}
          </label>
          <input
            type="text"
            id="rewardDetail"
            name="rewardDetail"
            required
            value={formData.rewardDetail}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter reward detail"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rewardType" className="block font-semibold mb-1">
            Reward Type{" *"}
          </label>
          <select
            id="rewardType"
            name="rewardType"
            value={formData.rewardType}
            required
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
          >
            <option value="">Select Reward Type</option>
            {rewardTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="rewardValue" className="block font-semibold mb-1">
            Reward Value{" *"}
          </label>
          <select
            id="rewardValue"
            name="rewardValue"
            value={formData.rewardValue}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
          >
            <option value="">Select Reward Value</option>
            {rewardValues.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            title="Please enter a valid email address"
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password *
          </label>
          <input
            type="string"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="countryCode" className="block font-semibold mb-1">
            Country Code *
          </label>
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
          >
            <option value="">Select Country Code</option>
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold mb-1">
            Phone Number *
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            pattern="[0-9]{10}"
            title="Please enter a  number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter phone number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block font-semibold mb-1">
            Website *
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 bg-gray-100"
            placeholder="Enter your website URL"
          />
        </div>
        <label htmlFor="logo" className="block font-semibold mb-1">
          Upload Logo
        </label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="w-full border rounded-md px-4 py-2 bg-gray-100 mb-4"
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="termsAgreed"
              required
              checked={formData.termsAgreed}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-gray-700">
              I agree to the terms of service
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBusiness;
