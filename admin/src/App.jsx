import React from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Order from "./pages/order/order.jsx";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/list/list.jsx";
import AdminAuth from "./components/Navbar/AdminAuth.jsx";

const App = () => {
  const url = "https://food-order-backend-5.onrender.com";

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <hr className="border-gray-200" />
      <div className="flex flex-1">
        <Sidebar />
        <Routes>
        <Route path="/adminauth" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
        <Route path="/adminsignin" element={<div>Admin Signin</div>} />
        <Route path="/adminsignup" element={<AdminAuth />} />

          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
