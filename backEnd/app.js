const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const multer = require('multer');
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

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
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


app.post('/post-product', upload.single('productImage'), async (req, res) => {
  console.log(req.body);
  try {
    const { name, price, description } = req.body;

    // Get the filename of the uploaded image from req.file
    const productImage = req.file.filename;

    const newProduct = new Product({
      name,
      price,
      description,
      productImage, // Include the image filename in the product data
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct, // Include the entire product object in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-products', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Check if there are no products
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send the array of products in the response
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
