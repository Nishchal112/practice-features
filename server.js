<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/productsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

// Sample Data (Run only once)
async function insertSampleData() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "Laptop", category: "Electronics", price: 500 },
      { name: "Phone", category: "Electronics", price: 300 },
      { name: "Shirt", category: "Clothing", price: 20 },
      { name: "Shoes", category: "Clothing", price: 50 },
    ]);
    console.log("Sample Data Inserted");
  }
}
insertSampleData();

// Get Products with Filters
app.get("/products", async (req, res) => {
  let filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };
  if (req.query.maxPrice) {
    filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
  }

  const products = await Product.find(filter);
  res.json(products);
});

app.listen(3000, () => console.log("Server running on port http://localhost:3000"));
=======
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ns', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🎟️ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use('/auth', require('./routes/auth'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
>>>>>>> ff07f6a (this is change in login by jwt)
