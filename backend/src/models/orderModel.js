import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },

   items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;