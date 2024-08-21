import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder= () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <form className='place-order p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"'>
      <div className="place-order-left space-y-4">
        <p className="title text-2xl font-bold mb-4">Delivery Information</p>
        <div className="multi-fields grid grid-cols-2 gap-4">
          <input type="text" placeholder='First name' className="border rounded-lg p-3 w-full"/>
          <input type="text" placeholder='Last name' className="border rounded-lg p-3 w-full"/>
        </div>
        <input type="email" placeholder='Email address' className="border rounded-lg p-3 w-full"/>
        <input type="text" placeholder='Street' className="border rounded-lg p-3 w-full"/>
        <div className="multi-fields grid grid-cols-2 gap-4">
          <input type="text" placeholder='City' className="border rounded-lg p-3 w-full"/>
          <input type="text" placeholder='State' className="border rounded-lg p-3 w-full"/>
      </div>
      <div className="multi-fields grid grid-cols-2 gap-4">
          <input type="text" placeholder='Zip code' className="border rounded-lg p-3 w-full"/>
          <input type="text" placeholder='Country' className="border rounded-lg p-3 w-full"/>
      </div>
      <input type="text" placeholder='Phone' className="border rounded-lg p-3 w-full"/>
      </div>
      <div className="place-order-right space-y-6"></div>

      <div className="cart-total mb-4">
          <h2 className="text-xl font-bold">Cart Totals</h2>
        </div>
        <div className="cart-total-details flex justify-between mb-2">
          <p>Subtotal</p>
          <p className="font-medium">${getTotalCartAmount()}</p>
        </div>
        <hr/>
        <div className="cart-total-details flex justify-between my-2">
          <p>Delivery Fee</p>
          <p className="font-medium">${2}</p>
        </div>
        <hr/>
        <div className="cart-total-details flex justify-between my-4">
          <b>Total</b>
          <b className="font-bold">${getTotalCartAmount()+2}</b>
        </div>
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">PROCEED TO PAYMENT</button>
    
  

    </form>
      
    
  )
}

export default PlaceOrder
