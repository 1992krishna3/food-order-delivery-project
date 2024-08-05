import express from "express";
import { createOrder, getOrders,getOrderById } from "../../controllers/userControllers.js";
import auth from "../../middleware/authMiddleware.js";

const userRouter = express.Router();

// @route   POST api/orders
// @desc    Create an order
// @access  Private
userRouter.post('/',auth, createOrder);
userRouter.get('/',auth, getOrders);
userRouter.get('/:id',auth, getOrderById);

export default userRouter;
