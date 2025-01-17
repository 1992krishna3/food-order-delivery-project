import React from "react";
import foodlogo from "../../assets/foodlogo.png";
import profile_image from "../../assets/profile_image.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800">
      <img className="h-12 w-auto cursor-pointer" src={foodlogo} alt="" />
      <img className="h-10 w-10 rounded-full" src={profile_image} alt="" />
      <nav className="p-4 bg-gray-200 h-full">
     
    </nav>
    </div>
  );
};

export default Navbar;
