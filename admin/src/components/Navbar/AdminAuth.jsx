import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const [isSignup, setIsSignup] = useState(true); // Track whether it's the signup or signin form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (either signup or signin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url;
      let response;

      if (isSignup) {
         // Admin Signup
        url = "https://food-order-backend-5.onrender.com/api/v1/admin/signup";
        response = await axios.post(url, formData);
    } else {
        // Admin Signin
        url = "https://food-order-backend-5.onrender.com/api/v1/admin/signin";
        response = await axios.post(url, {
          email: formData.email,
          password: formData.password,
      
        });
        }

      alert(response.data.message);
      if (isSignup) {
        navigate("/adminsignin"); // Redirect to signin page after successful signup
      } else {
        navigate("/admin/dashboard"); // Redirect to admin dashboard after successful signin
      }
    } catch (error) {
      console.error("Error during authentication", error);
      alert("Failed to authenticate");
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Admin Signup" : "Admin Signin"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}
        <button type="submit">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AdminAuth;
