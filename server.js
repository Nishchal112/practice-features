
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
