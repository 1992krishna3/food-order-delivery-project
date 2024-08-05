import express from "express";
import { createFoodItem, getFoodItems,getFoodItemById,updateFoodItem,deleteFoodItem } from "../../controllers/foodController.js";
import auth from "../../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/', auth, createFoodItem);
userRouter.get('/', getFoodItems);
userRouter.get('/:id', getFoodItemById);
userRouter.put('/:id', auth, updateFoodItem);
userRouter.delete('/:id',auth, deleteFoodItem );

export default userRouter;
