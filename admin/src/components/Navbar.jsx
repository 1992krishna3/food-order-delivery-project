import React from 'react'
import logo from '../assets/logo.png'
import profile_image from '../assets/profile_image.png'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-800'>
        <img className='h-12 w-auto cursor-pointer' src={logo} alt=""/>
        <img className='h-10 w-10 rounded-full'src={profile_image} alt=""/>
      
    </div>
  )
}

export default Navbar
