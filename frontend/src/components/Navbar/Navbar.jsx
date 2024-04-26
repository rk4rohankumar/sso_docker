import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {user,logout, isAuthenticated} = useAuth0();
  const [showMenu, setShowMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
    // setIsLoggedIn(true);
    closeMenu();
  }, [location]);

  useEffect(() => {
    const token = isAuthenticated ||localStorage.getItem("token") ;
    console.log("token",token)
    if (token) {
      setIsLoggedIn(true);
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left portion - Brand logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://i.ibb.co/LJqgmcq/localmamalogojpeg.jpg"
              alt="Brand Logo"
              className="h-8 mr-2"
            />
            <span className="text-gray-800 text-lg font-bold">Local Mama</span>
          </Link>
        </div>

        {/* Right portion - Hamburger Icon and Navigation Links */}
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            <svg
              className={`h-6 w-6 ${showMenu ? "hidden" : "block"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            ref={menuRef}
            className={`md:flex md:items-center md:space-x-6 mt-4 md:mt-0 ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <NavItem
                path="/"
                text="Home"
                closeMenu={closeMenu}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
              <NavItem
                path="/business"
                text="Nearby Business"
                closeMenu={closeMenu}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
              <NavItem
                path="/rewards"
                text="Rewards"
                closeMenu={closeMenu}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
              <NavItem
                path="/faq"
                text="FAQ"
                closeMenu={closeMenu}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            </ul>
            <div className="flex mt-4 md:mt-0 items-center">
              {/* Conditionally render login/signup buttons */}
              {!isLoggedIn && (
                <>
                  <NavLinkButton
                    path="/login"
                    text="Login"
                    closeMenu={closeMenu}
                    activeLink={activeLink}
                  />
                  <NavLinkButton
                    path="/signup"
                    text="Signup"
                    closeMenu={closeMenu}
                    activeLink={activeLink}
                  />
                </>
              )}
              {/* Conditional rendering for logout button */}
              {isLoggedIn && (
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ path, text, closeMenu, activeLink, setActiveLink }) => (
  <li>
    <Link
      to={path}
      className={`text-gray-800 hover:text-blue-600 ${
        activeLink === path ? "font-bold" : ""
      }`}
      onClick={() => {
        setActiveLink(path);
        closeMenu();
      }}
    >
      {text}
    </Link>
  </li>
);

const NavLinkButton = ({ path, text, closeMenu, activeLink }) => (
  <Link to={path}>
    <button
      className={`hover:bg-${
        activeLink === path ? "blue" : "orange"
      }-500 text-${
        activeLink === path ? "blue" : "orange"
      }-500 hover:text-gray-200 font-semibold py-2 px-4 rounded-full  `}
      onClick={closeMenu}
    >
      {text}
    </button>
  </Link>
);

export default Navbar;
