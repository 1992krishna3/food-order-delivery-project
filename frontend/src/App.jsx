import React, { useState } from "react";
import Navbar from './components/Navbar';
import './index.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup.jsx";
import PaymentPage from "./pages/Payment/PaymentPage.jsx";

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
        <Route path='/payment' element={<PaymentPage />} />
      </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;