import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'url("https://i.ibb.co/LppzMr6/wallpaperflare-com-wallpaper-2024-02-02-T012925-169.jpg")',
      }}
    >
      <div className="text-center border border-gray-400 p-12 rounded-lg bg-white bg-opacity-5 backdrop-blur-xl">
        <h1 className="text-4xl font-bold mb-6">Oops! Page Not Found</h1>
        <p className="text-lg mb-4">Lets have a Cup of tea .</p>
        <p className="text-lg mb-4">OR</p>
        <p className="text-lg mb-8">
          Go back to the{" "}
          <Link to="/" className="underline">
            Home
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Error;
