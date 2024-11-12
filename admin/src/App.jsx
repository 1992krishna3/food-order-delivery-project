import React from 'react';
import './index.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import { Routes,Route } from 'react-router-dom';
import Order from './pages/Order/Order.jsx'
import Add from './pages/Add/Add.jsx';
import List from './pages/list/list.jsx';


const App = () => {

  const url = "http://localhost:3000"

  return (
    <div className="flex flex-col h-screen">
      <Navbar/>
      <hr  className="border-gray-200"/>
      <div className="flex flex-1">
        <Sidebar/>
        <Routes>
        <Route path="/add" element={<Add url={url}/>}/>
        <Route path="/list" element={<List url={url}/>}/>
        <Route path="/order" element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App