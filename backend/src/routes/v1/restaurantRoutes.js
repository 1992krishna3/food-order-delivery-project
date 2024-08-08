import express from "express";
import { createRestaurant, deleteRestaurant, getRestaurantById, getRestaurants, updateRestaurant } from "../../controllers/restaurantContoller.js";
import userRouter from "./foodRoutes.js";
import auth from "../../middleware/authMiddleware.js";

const router = express.Router();

userRouter.post('/',  createRestaurant);
userRouter.get('/', getRestaurants);
userRouter.get('/:id', getRestaurantById);
userRouter.put('/:id',  updateRestaurant);
userRouter.delete('/:id', auth, deleteRestaurant);

export default userRouter;

