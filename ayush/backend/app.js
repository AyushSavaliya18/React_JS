const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/React", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: "user"},
});

// Update the collection name to "register"
const Register = mongoose.model("Register", userSchema, "register");

// Register Route (for initial sign up)
app.post("/api/register", async (req, res) => {
  const {username, email, password, role} = req.body;

  try {
    // Check for existing user
    const existingUser = await Register.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "Email is already registered."});
    }

    // Create and save new user (no password hashing)
    const newUser = new Register({
      username,
      email,
      password, // Plain password (no hashing)
      role,
    });
    await newUser.save();

    res.status(201).json({message: "User registered successfully!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred during registration."});
  }
});

// Login Route (for authentication)
app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    // Find user by email
    const user = await Register.findOne({email});
    if (!user) {
      return res.status(400).json({message: " Email not Found"});
    }

    // Compare the entered password with the stored password (no hashing, direct comparison)
    if (password !== user.password) {
      return res.status(400).json({message: "Invalid Email or Password"});
    }

    // Send back the user details (no token generation)
    res.status(200).json({
      message: "Login successful",
      user: {username: user.username, email: user.email, role: user.role},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred during login."});
  }
});

const productSchema = new mongoose.Schema({
  product_name: {type: String, required: true},
  price: {type: Number, required: true},
  qty: {type: Number, required: true},
  size: {type: String},
  image: {type: String},
  description: {type: String, required: true},
  brand_name: {type: String, required: true},
});

const Product = mongoose.model("Product", productSchema);

// POST route to add a product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send({message: "Product added successfully"});
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .send({message: "Error adding product", error: error.message});
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { product_name, price, qty, size, image, description, brand_name } = req.body;

  try {
    // Find the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields, only updating fields that are present in the request body
    product.product_name = product_name || product.product_name;
    product.price = price || product.price;
    product.qty = qty || product.qty;
    product.size = size || product.size;
    product.image = image || product.image;
    product.description = description || product.description;
    product.brand_name = brand_name || product.brand_name;

    // Save the updated product to the database
    await product.save();

    // Return the updated product as the response
    res.status(200).json({
      message: 'Product updated successfully!',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
