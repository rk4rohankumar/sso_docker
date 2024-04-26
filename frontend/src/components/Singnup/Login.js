import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginBusiness } from "../../utils/APIs";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { loginWithRedirect,isAuthenticated } = useAuth0();

  useEffect(() => {
    const token = localStorage.getItem("token")||isAuthenticated;
    if (token) {
      navigate("/");
      alert("you are already logged in try refreshing page");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${loginBusiness}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
          <button onClick={() => loginWithRedirect()}>Log In With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
