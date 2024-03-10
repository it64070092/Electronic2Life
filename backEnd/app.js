const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const multer = require('multer');
const User = require('./models/user'); // Check the path
const Product = require('./models/product');
const Offer = require('./models/form')
const Payment = require('./models/payment')

const app = express();

const PORT = process.env.PORT || 3000;
const cors = require('cors');
// Middleware to parse JSON requests
app.use('/uploads', express.static('uploads'));

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

// Update the product by ID
app.put('/update-product/:productId', upload.single('productImage'), async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, price , description} = req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add fields to update only if they are present in the request body
    if (name) {
      updateFields.name = name;
    }
    if (price) {
      updateFields.price = price;
    }
    if (description) {
      updateFields.description = description;
    }

    // Check if an image file was uploaded
    if (req.file) {
      updateFields.productImage = req.file.filename;
    }

    // Find the product by ID and update the specified fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated product
    );

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete-products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by productId and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch all products from the database after deletion
    const products = await Product.find();

    // Send the array of products in the response
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/post-offer', upload.single('offerImage'), async (req, res) => {
  console.log(req.body);
  try {
    const { name, address, description, tel, status, userId } = req.body;

    // Get the filename of the uploaded image from req.file
    const offerImage = req.file.filename;

    const newOffer = new Offer({
      name,
      userId,
      address,
      tel,
      status,
      description,
      offerImage, // Include the image filename in the product data
    });

    const savedOffer = await newOffer.save();
    res.status(201).json({
      message: 'Offer created successfully',
      product: savedOffer, // Include the entire product object in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-orders', async (req, res) => {
  try {
    // Fetch all products from the database
    const offers = await Offer.find();

    // Check if there are no products
    if (offers.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send the array of products in the response
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.put('/update-offer/:offerId', async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { status } = req.body;
    console.log(offerId)
    console.log(req.body)

    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ error: 'Invalid offer ID' });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the status field to update if it's present in the request body
    if (status !== undefined) {
      updateFields.status = status;
    }
    console.log(updateFields.status)

    // Find the offer by ID and update the specified fields
    const updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated offer
    );

    // Check if the offer was found and updated
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/post-payment', upload.single('paymentImage'), async (req, res) => {
  try {
    // Ensure required fields are present
    const { userId, productId, price, address, status } = req.body;
    if (!userId || !productId || !price || !address || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the filename of the uploaded image from req.file
    const paymentImage = req.file.filename;

    const newPayment = new Payment({
      userId,
      productId,
      price,
      status,
      address,
      paymentImage,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({
      message: 'Payment created successfully',
      payment: savedPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating payment' });
  }
});



app.put('/update-offer/:offerId', async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { status } = req.body;

    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ error: 'Invalid offer ID' });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the status field to update if it's present in the request body
    if (status !== undefined) {
      updateFields.status = status;
    }

    // Find the offer by ID and update the specified fields
    const updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated offer
    );

    // Check if the offer was found and updated
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/update-payment/:paymentId', async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const { status } = req.body;
    
    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ error: 'Invalid payment ID' });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the status field to update if it's present in the request body
    if (status !== undefined) {
      updateFields.status = status;
    }

    // Find the offer by ID and update the specified fields
    const updatedOffer = await Payment.findByIdAndUpdate(
      paymentId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated offer
    );

    // Check if the offer was found and updated
    if (!updatedOffer) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
