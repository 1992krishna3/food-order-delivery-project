import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend
const placeOrder = async (req,res) =>{
   
  const frontend_url = "http://localhost:5173"

  console.log('Received Order Data:', req.body); 
  const { userId, address, items, amount } = req.body;

  // Basic validation
  if (!userId || !address || !items || items.length === 0 || !amount) {
    console.error("Missing required fields:", { userId, address, items, amount });
    return res.status(400).json({ success: false, message: "Invalid order data" });
  }

  // Validate each item in the 'items' array
  for (let item of items) {
    if (!item.name || !item.price || !item.quantity) {
      return res.status(400).json({ success: false, message: "Invalid item data" });
    }
  
    if (typeof item.price !== 'number' || item.price <= 0) {
      return res.status(400).json({ success: false, message: `Invalid price for item: ${item.name}. Price must be a positive number.` });
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({ success: false, message: `Invalid quantity for item: ${item.name}. Quantity must be a positive number.` });
    }

  }

  // Ensure amount is a valid number
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }


  try{
     // Create the new order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId,{cartData:{}});

     // Prepare line items for Stripe payment
    const line_items = items.map((item)=>({
      price_data:{
        currency:"inr",
        product_data:{
          name:item.name
    },
    unit_amount:item.price*100
      },
      quantity:item.quantity
    }))

    // Add delivery charges
    line_items.push({
      price_data:{
        currency:"inr",
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:2*100
      },
      quantity:1
    })
   
     // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode:'payment',
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    })

    res.json({success:true,session_url:session.url})

  }catch(error) {
     console.log(error);
     res.json({success:false,message:"Error"})
  }
  }



export default placeOrder;
