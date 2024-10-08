import React from 'react'
import './index.css';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom';
import Add from './pages/Add';
import Orders from './pages/Orders';
import List from './pages/List';

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
        <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
