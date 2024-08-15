import React, { useState } from 'react';
import logo from '../assets/logo.png'; 
import search_icon from '../assets/search_icon.png';
import basket_icon from '../assets/basket_icon.png';


const Navbar =({setShowLogin}) => {
  
  const [menu, setMenu] = useState("menu");

  const handleMenuClick = (item) => {
    console.log(`${item} clicked`);
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  const handleBasketClick = () => {
    console.log("Basket clicked");
  };

  const handleSignInClick = () => {
    setShowLogin(true);
  };

 
  return(
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <div className="flex-shrink-0">
      <img src={logo} alt="Logo" className="h-8 w-auto ml-auto"/>
      <ul className="flex flex-1 justify-center items-center  space-x-6 text-gray-700">
      <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Home')}>Home</li>
        <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Menu')}>Menu</li>
        <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Mobile App')}>Mobile-app</li>
        <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Contact Us')}>Contact us</li>
      </ul>

      
      <div className="flex justify-center items-center space-x-4">
        <img src={search_icon} alt="Search" className="h-6 w-6 cursor-pointer" onClick={handleSearchClick}  />
        <div className="relative">
          <img src={basket_icon} alt="Basket" className="h-6 w-6 cursor-pointer" onClick={handleBasketClick}  />
          <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"  onClick={handleSignInClick} >sign in</button>
      </div>
    </div>
    </div>
    
    
    </nav>
  );
};
export default Navbar;