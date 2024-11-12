import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverConfig from "./config/serverConfig.js";
import dbConnect from "./config/dbConfig.js";
import orderRouter from "./routes/v1/orderRoutes.js";
import userRouter from "./routes/v1/userRoutes.js";
import foodRoutes from "./routes/v1/foodRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import bodyParser from "body-parser";
import adminRouter from "./routes/v1/adminRoutes.js";

const app = express();

dotenv.config();

//Middleware to parse json bodies
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true,
}
app.use(cors(corsOptions));

//Define Routes
app.use("/api/v1/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/v1/foods", foodRoutes);

app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Food Order App");
});

app.listen(serverConfig.Port, () => {
  console.log(`Example app listening on port ${serverConfig.Port}`);
  dbConnect();
  console.log("Db connected");
});
