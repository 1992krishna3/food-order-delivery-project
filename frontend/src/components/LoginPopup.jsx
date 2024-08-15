import React, { useState } from 'react'
import { assets } from '../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Login")
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form  className="bg-white p-6 rounded-lg w-full max-w-md"></form>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{currState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className="cursor-pointer w-6 h-6"/>
      </div>
      <div className="space-y-4">
        {currState==="login"?<></>:<input type="text" placeholder='Your name' required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>}
        <input type="email" placeholder='Your email' required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="password" placeholder='Password' required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
        {currState==="Sign up"?"Create account":"Login"}</button>
      <div className="mt-4 flex items-center">
        <input type="checkbox" required className="mr-2"/>
        <p className="text-sm">By continuing, i agree to the terms of use & privacy policy.</p>
      </div>
      {currState==="Login"
       ?<p className="mt-4 text-sm">Create a new account? <span className="text-blue-500 cursor-pointer" onClick={()=>setCurrState("Sign up")}>Click here</span></p>
       :<p className="mt-4 text-sm">Already have an account? <span  className="text-blue-500 cursor-pointer" onClick={()=>setCurrState("Login")}>Login here</span></p>
      }
    </div>
   
  )
}

export default LoginPopup
