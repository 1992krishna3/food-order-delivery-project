import express from "express";
import {  addFood,getFoodItems,getFoodItemById,updateFoodItem,deleteFoodItem, } from "../../controllers/foodController.js";
import auth from "../../middleware/authMiddleware.js";
import {upload} from "../../middleware/uploadMiddleware.js";



const foodRouter = express.Router();

// Route to add a new food item

foodRouter.post('/add',upload.single('image'), addFood);
foodRouter.get('/', getFoodItems);
foodRouter.get('/:id', getFoodItemById);
foodRouter.put('/:id', auth, updateFoodItem);
foodRouter.delete('/:id',auth, deleteFoodItem );

export default foodRouter;
