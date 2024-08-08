import express from "express";
import { createOrder, getOrders,getOrderById } from "../../controllers/userControllers.js";


const userRouter = express.Router();

// @route   POST api/orders
// @desc    Create an order
// @access  Private
userRouter.post('/', createOrder);
userRouter.get('/', getOrders);
userRouter.get('/:id', getOrderById);

export default userRouter;
