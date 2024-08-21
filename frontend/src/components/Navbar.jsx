import React, { useState } from 'react';
import logo from '../assets/logo.png'; 
import search_icon from '../assets/search_icon.png';
import basket_icon from '../assets/basket_icon.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';


const Navbar =({setShowLogin}) => {
  
  const [menu, setMenu] = useState("menu");

  const {getTotalCartAmount} = useContext(StoreContext);

  const handleLogoClick = () => {
   console.log("logo clicked");
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
      <Link to='/Logo'><img src={logo} alt="Logo" className="h-8 w-auto cursor-pointer" onClick={handleLogoClick} /></Link>
      <ul className="flex justify-between shadow-lg  space-x-6 text-gray-700">
        <Link to='/' className="hover:text-gray-900  cursor-pointer" onClick={() => handleMenuClick('Home')}>Home</Link>
        <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Menu')}>Menu</li>
        
        <li className="hover:text-gray-900 cursor-pointer" onClick={() => handleMenuClick('Contact Us')}>Contact us</li>
      </ul>

      
      <div className="flex justify-center items-center space-x-4">
        <img src={search_icon} alt="Search" className="h-6 w-6 cursor-pointer" onClick={handleSearchClick}  />
        <div className="relati ve">
         <Link to='/cart'>
        <img src={basket_icon} alt="Basket" className="h-6 w-6 cursor-pointer" onClick={handleBasketClick}  /></Link> 
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"  onClick={handleSignInClick} >sign in</button>
      </div>
    </div>
    </div>
    
    
    </nav>
  );
};
export default Navbar;