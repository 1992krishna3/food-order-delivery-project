import express from "express";
import {signup, signin, getUserProfile} from "../../controllers/userControllers.js";

const userRouter = express.Router();



userRouter.post("/signup", signup);
userRouter.post("/signin", signin );
userRouter.get('/profile', getUserProfile);


export default userRouter;