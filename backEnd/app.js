const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Check the path
const Product = require('./models/product');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://elec2life:test12345@electronic2life.etmvjkw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello MongoDB Atlas with Express.js!');
});
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user)
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'No User Name',
    username:username });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) { 
      return res.status(401).json({ error: 'Password Wrong', username:username });
    }
    res.status(200).json({ user });
    // res.status(200).json({ message: 'Login successful Welcome ' + user.email});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Register a new user
app.post('/register', async (req, res) => {
  console.log(req.body)
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
