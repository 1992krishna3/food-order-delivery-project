import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Food from "../models/foodModel.js";
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Admin Signup function
export const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password.trim() !== confirmPassword.trim()) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin user
    const newAdmin = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: "admin", // Ensure the role is set to "admin"
    });

    const newAdminCreated = await newAdmin.save();
    if (!newAdminCreated) {
      return res.status(400).json({ message: "Admin not created" });
    }

    // Generate token
    const token = generateToken(newAdmin._id, newAdmin.role);

    // Store token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({ message: "Admin signed up successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin Signin function
export const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.status(400).json({ message: "Not authorized as admin" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Store token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Admin signed in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("Users fetched:", users);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

// Fetch all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Update order status by ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

// Update food item details
export const updateFoodItem = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    food.name = req.body.name || food.name;
    food.price = req.body.price || food.price;
    food.description = req.body.description || food.description;

    await food.save();
    res.status(200).json({ message: "Food item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update food item", error });
  }
};

// Delete a food item by ID
export const deleteFoodItem = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food item", error });
  }
};

const adminController = {
  adminSignup,
  adminSignin,
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  updateFoodItem,
  deleteFoodItem,
};

export default adminController;
