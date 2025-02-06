const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For JWT token creation
const User = require("../models/User"); // Import User model
const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    // Create a new User instance
    const newuser = new User({
      username,
      email,
      password: hashpass,
    });

    // Save the user to the database
    await newuser.save();

    // Create a JWT token
    const token = jwt.sign({ id: newuser.id }, "mystring", {
      expiresIn: "1h",
    });

    // Return the token and success message
    res.json({ message: "User registered successfully!", token });
  } catch (err) {
    res.status(500).json({ error: "Error registering user!" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, "mystring", { expiresIn: "1h" });

    // Send response with token
    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in!" });
  }
});

module.exports = router;
