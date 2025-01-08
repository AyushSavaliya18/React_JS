const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Ayush", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// Update the collection name to "register"
const Register = mongoose.model("Register", userSchema, "register");

// Register Route (for initial sign up)
app.post("/api/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check for existing user
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create and save new user (no password hashing)
    const newUser = new Register({
      username,
      email,
      password, // Plain password (no hashing)
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
});

// Login Route (for authentication)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Compare the entered password with the stored password (no hashing, direct comparison)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send back the user details (no token generation)
    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
