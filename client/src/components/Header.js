import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logout from "../pages/Logout";

function Header({ userDetails }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const handleClickAdmin = () => {
    setShowAdmin((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center p-2 bg-gray-100">
      {/* Logo */}
      <div aria-label="Site Icon" role="img" className="mr-4">
        <Link to="/">
          <img src="/logo1.jpg" alt="logo" className="w-14 h-14 rounded-full" />
        </Link>
      </div>

      {/* Search */}
      <div className="hidden lg:flex flex-grow justify-center items-center">
        <div className="flex items-center border rounded-full max-w-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full focus:outline-none shadow"
          />
          <div className="text-lg w-20 flex justify-center bg-red-600 h-10 items-center text-white cursor-pointer">
            <GrSearch />
          </div>
        </div>
      </div>

      {/* Cart & User Actions */}
      <div className="flex items-center gap-4 md:gap-7 px-4 sm:px-6 justify-between md:justify-start">
        {/* User Icon */}
        {userDetails?._id && (
          <div className="relative">
            <div
              className="text-xl sm:text-3xl cursor-pointer"
              onClick={handleClickAdmin}
            >
              <FaRegCircleUser />
            </div>
            {userDetails.role === "admin" && showAdmin && (
              <div className="absolute top-10 right-0.5 bg-white shadow-md rounded-md min-w-[150px]">
                <Link
                  to="/admin-pannel/all-products"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded whitespace-nowrap"
                  onClick={handleClickAdmin}
                >
                  Admin Panel
                </Link>
              </div>
            )}
          </div>
        )}

        {/* User Name */}
        <div>
          {userDetails ? <p>{userDetails.name}</p> : <p>No user found</p>}
        </div>

        {/* Cart Icon */}
        <div className="text-2xl sm:text-3xl relative cursor-pointer">
          <span>
            <FaShoppingCart />
          </span>
          <div className="bg-red-600 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full p-0 sm:p-1 flex items-center justify-center absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
            <p className="text-xs">0</p>
          </div>
        </div>

        {/* Login or Logout */}
        <div>
          {userDetails ? (
            <Logout />
          ) : (
            <Link
              to="/sign-in"
              className="px-2 py-1 sm:px-3 sm:py-1 bg-red-600 text-white hover:bg-red-700 rounded-2xl sm:rounded-2xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
