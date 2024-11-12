import React, { useState } from "react";
import Navbar from './components/Navbar';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import MyOrders from "./pages/MyOrders/MyOrders";
import { loadStripe } from "@stripe/stripe-js";


const Stripe = loadStripe("pk_test_51QJsXoP2ETu02Bx1hFtpB2NQQ1wr1UMvXx8amOfpujgJEAygxLQiibEBY6YwvnTU2PiKUibnTCotBO9uwWSyNePd00kfJVF55n")

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  

  return(
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="min-h-screen bg-gray-100">
      
      <Navbar setShowLogin={setShowLogin} />
   
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;