import React, { useState } from 'react';
import logo from '../assets/logo.png'; 
import search_icon from '../assets/search_icon.png';
import basket_icon from '../assets/basket_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import profile_icon from '../assets/profile_icon.png';
import bag_icon from '../assets/bag_icon.png';
import logout_icon from '../assets/logout_icon.png';


const Navbar =({setShowLogin}) => {
  
  const [menu, setMenu] = useState("menu");

  const {getTotalCartAmount,token,setToken,food_list} = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

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

const handleLogout = () => {
  setToken(""); // Clear token from state
  localStorage.removeItem("authToken"); // Remove token from localStorage
  console.log("User logged out");
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
        <div className="relative">
         <Link to='/cart'>
        <img src={basket_icon} alt="Basket" className="h-6 w-6 cursor-pointer" onClick={handleBasketClick}  /></Link> 
        {getTotalCartAmount() > 0 && <div className="dot"></div>}
      </div>
      {!token?<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"  onClick={handleSignInClick} >sign in</button>
        :<div className="relative">
        <div className='navbar-profile   cursor-pointer'>
        <img src={profile_icon} alt="Profile" className="w-8 h-8 rounded-full" />
        <ul className='nav-profile-dropdown absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-2 hidden"'>
         <li><img src={bag_icon} alt="Orders" className="w-5 h-5 mr-2"/><p className="text-gray-800">Orders</p></li> 
         <hr className="border-gray-200"/>
         <li onClick={logout} className="flex items-center p-2 hover:bg-gray-100 transition cursor-pointer">
          <img src={logout_icon} alt="Logout" className="w-5 h-5 mr-2"/><p className="text-gray-800">Logout</p></li>
        </ul>
    </div>
    </div>
}
    </div>
    </div>
    </div>
    
    
    </nav>

  );
};
export default Navbar;