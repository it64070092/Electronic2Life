const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Check the path
const Product = require('./models/product');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://elec2life:test12345@electronic2life.etmvjkw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello MongoDB Atlas with Express.js!');
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201 Created status code
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});


app.post('/post-product', async (req, res) => {
  console.log(req.body)
  try {
    const { name, price, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
