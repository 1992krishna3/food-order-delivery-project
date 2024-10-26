import React, { useContext  } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = ()  => {
  

  const navigate = useNavigate(); 

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  
  console.log('Token:', token); // Check token availability

  if (!token) {
    alert('You need to log in first.');
    return;
  }

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
  
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
      paymentInfo: {
        paymentStatus: "pending", // Adjust according to your logic
        paymentMethod: "online",  
    }
}; 
// You can send orderData to your backend here
    console.log('Authorization Token:', token);
    try{
      const response = await (`${url}/api/orders/create`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
    })
    
    alert('Order placed successfully!');
     // Redirect to payment page with necessary order details
     navigate('/payment') 
  } catch (error) {
    
  
  }
}
    return (
    <form onSubmit={placeOrder} className='place-order p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"'>
      <div className="place-order-left space-y-4">
        <p className="title text-2xl font-bold mb-4">Delivery Information</p>
        <div className="multi-fields grid grid-cols-2 gap-4">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' className="border rounded-lg p-3 w-full"/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' className="border rounded-lg p-3 w-full"/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className="border rounded-lg p-3 w-full"/>
        <input required name='street' onChange={onChangeHandler} value={data.street}type="text" placeholder='Street' className="border rounded-lg p-3 w-full"/>
        <div className="multi-fields grid grid-cols-2 gap-4">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className="border rounded-lg p-3 w-full"/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className="border rounded-lg p-3 w-full"/>
      </div>
      <div className="multi-fields grid grid-cols-2 gap-4">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pincode' className="border rounded-lg p-3 w-full"/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className="border rounded-lg p-3 w-full"/>
      </div>
      <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className="border rounded-lg p-3 w-full"/>
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
        <button type='submit' className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200">PROCEED TO PAYMENT</button>
    
  

    </form>
      
    
  )
  
}
   export default PlaceOrder;
