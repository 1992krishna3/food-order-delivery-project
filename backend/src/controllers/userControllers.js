import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Function to create an order
export const createOrder = async (req, res) => {
  try {
      // Your logic to create an order
      res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Function to get all orders
export const getOrders = async (req, res) => {
  try {
      // Your logic to get all orders
      res.status(200).json({ message: 'Orders fetched successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Function to get an order by ID
export const getOrderById = async (req, res) => {
  try {
      const orderId = req.params.id;
      // Your logic to get order by ID
      res.status(200).json({ message: 'Order fetched successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


//Signup function
export const signup = async (req, res) => {
    try {
      const { firstName, lastName,email, password  } = req.body
      console.log(email);
      
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }

      const userExist = await User.findOne({ email });
      console.log(userExist);
      
      if (userExist) {
        return res.status(400).json({message:"User is already exist"});
      }
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      
      const newUserCreated = await newUser.save();
      console.log(newUserCreated);
  
      if (!newUserCreated) {
        return res.status(400).json({message:"user is not created"});
      }
  
      const token = generateToken(newUser._id);
      console.log('Generated Token:', token);
    
      res.status(201).json({message: "Signed successfully!",token});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Internal Server Error", error: error.message});
    }
  };
  //Signin function
  export const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
     console.log(email);

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message:"User not found"});
      }
      
      console.log('Received Password:', password);
      console.log('Stored Hashed Password:', user.password);

      const matchPassword = await bcrypt.compare(password, user.password);
      console.log(matchPassword);

      if (!matchPassword) {
        return res.status(400).json({message:"Password is not correct"});
      }
  
      const token = generateToken(user._id);
      console.log('Generated Token:', token)
      
      res.status(201).json({message:"signin sucessful", token});
    } catch (error) {
      console.log(error, "Something wrong");
      res.status(500).json({message:"Internal Server Error", error: error.message});
    }
  };

  
// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user._id);

      if (!user) {
        console.log(user);
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
};
  