import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import serverConfig from "./config/serverConfig.js";
import dbConnect from "./config/dbConfig.js";
import orderRouter from "./routes/v1/orderRoutes.js";
import userRouter from "./routes/v1/userRoutes.js";
import foodRoutes from "./routes/v1/foodRoutes.js"
import RestaurantRoutes from "./models/restaurantModel.js";



dotenv.config();

const app = express();

//Middleware to parse json bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://example.com', // Update this to your frontend's domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

// Enable cors with options
app.use(cors(corsOptions));

//Define Routes
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/foods', foodRoutes);
app.use('/api/restaurants', RestaurantRoutes);


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Order App')
});

app.listen(serverConfig.Port, () => {
  console.log(`Example app listening on port ${serverConfig.Port}`);
  dbConnect();
  console.log("Db connected");
});