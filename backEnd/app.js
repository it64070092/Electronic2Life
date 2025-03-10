var elastic = require("./elastic-apm");

var otel = require("./otel");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path")

const multer = require("multer");
const User = require("./models/user"); // Check the path
const Product = require("./models/product");
const Offer = require("./models/form");
const Payment = require("./models/payment");
const Repair = require("./models/repair");

const app = express();

const PORT = process.env.PORT || 3000;
const cors = require("cors");
// Middleware to parse JSON requests
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://elec2life:test12345@electronic2life.etmvjkw.mongodb.net/",
);


app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello MongoDB Atlas with Express.js!");
});

app.post("/login", async (req, res) => {
  const transaction = elastic.startTransaction('User Login', 'request');
  console.log('Transaction started for login');

  try {
    const { username, password: enteredPassword } = req.body;

    const findUserSpan = elastic.startSpan('Find User');
    console.log('Find User span started');
    const user = await User.findOne({ username });
    if (findUserSpan) findUserSpan.end();
    console.log('Find User span ended');

    if (!user) {
      transaction.result = 'failure';
      return res.status(401).json({ error: "No User Name", username });
    }

    const comparePasswordSpan = elastic.startSpan('Compare Password');
    console.log('Compare Password span started');
    const passwordMatch = await bcrypt.compare(enteredPassword, user.password);
    if (comparePasswordSpan) comparePasswordSpan.end();
    console.log('Compare Password span ended');

    if (!passwordMatch) {
      transaction.result = 'failure';
      return res.status(401).json({ error: "Password Wrong", username });
    }

    const { password, ...userWithoutPassword } = user._doc;

    transaction.result = 'success';
    return res.status(200).json({ user: userWithoutPassword });
    
  } catch (error) {
    transaction.result = 'error';
    console.error("Login error:", error);
   return res.status(500).json({ error: "An unexpected error occurred", details: error.message });
  } finally {
    if (transaction) transaction.end();  // Ensure transaction ends
    console.log('Transaction ended for login');
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
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

app.post("/post-product", upload.single("productImage"), async (req, res) => {
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
      message: "Product created successfully",
      product: savedProduct, // Include the entire product object in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Check if there are no products
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the array of products in the response
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product from the database by ID
    const product = await Product.findById(productId);

    // Check if the product with the given ID exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the product in the response
    res.status(200).json({ product });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

// Update the product by ID
app.put(
  "/update-product/:productId",
  upload.single("productImage"),
  async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, price, description } = req.body;

      // Check if the product ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
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
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.delete("/delete-products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by productId and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch all products from the database after deletion
    const products = await Product.find();

    // Send the array of products in the response
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/post-offer", upload.single("offerImage"), async (req, res) => {
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
      message: "Offer created successfully",
      product: savedOffer, // Include the entire product object in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-orders", async (req, res) => {
  try {
    // Fetch all products from the database
    const offers = await Offer.find();

    // Check if there are no products
    if (offers.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the array of products in the response
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-offer/:offerId", async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { status } = req.body;
    console.log(offerId);
    console.log(req.body);

    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ error: "Invalid offer ID" });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the status field to update if it's present in the request body
    if (status !== undefined) {
      updateFields.status = status;
    }
    console.log(updateFields.status);

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
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/post-payment", upload.single("paymentImage"), async (req, res) => {
  try {
    // Ensure required fields are present
    const { userId, productId, address, status, tel } = req.body;
    if (!userId || !productId || !address || !status || !tel) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get the filename of the uploaded image from req.file
    const paymentImage = req.file.filename;

    const newPayment = new Payment({
      userId,
      productId,
      status,
      address,
      paymentImage,
      tel,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({
      message: "Payment created successfully",
      payment: savedPayment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating payment" });
  }
});

app.put("/update-offer/:offerId", async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { status } = req.body;

    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(offerId)) {
      return res.status(400).json({ error: "Invalid offer ID" });
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
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-payment/:paymentId", async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const { status } = req.body;

    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ error: "Invalid payment ID" });
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
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/update-repair/:repairId', async (req, res) => {
  try {
    const repairId = req.params.repairId;
    const { status } = req.body;
    
    // Check if the offer ID is valid
    if (!mongoose.Types.ObjectId.isValid(repairId)) {
      return res.status(400).json({ error: 'Invalid repair ID' });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the status field to update if it's present in the request body
    if (status !== undefined) {
      updateFields.status = status;
    }

    // Find the offer by ID and update the specified fields
    const updatedRepair = await Repair.findByIdAndUpdate(
      repairId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated offer
    );

    // Check if the offer was found and updated
    if (!updatedRepair) {
      return res.status(404).json({ error: 'Repair not found' });
    }

    res.status(200).json(updatedRepair);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update user profile by ID
app.put("/update-profile/:userId", async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.params.userId;
    const { firstName, lastName, phoneNumber, address } = req.body;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Initialize an empty update object
    const updateFields = {};

    // Add the fields to update if they are present in the request body
    if (firstName !== undefined) {
      updateFields.firstName = firstName;
    }

    if (lastName !== undefined) {
      updateFields.lastName = lastName;
    }

    if (phoneNumber !== undefined) {
      updateFields.phoneNumber = phoneNumber;
    }

    if (address !== undefined) {
      updateFields.address = address;
    }

    console.log(updateFields);
    // Find the user by ID and update the specified fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updateFields,
      },
      { new: true } // Return the updated user
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/post-repair", upload.single("repairImage"), async (req, res) => {
  console.log(req.body);
  try {
    const { name, address, description, tel, status, userId } = req.body;

    // Get the filename of the uploaded image from req.file
    const repairImage = req.file.filename;

    const newRepair = new Repair({
      name,
      userId,
      address,
      tel,
      status,
      description,
      repairImage, // Include the image filename in the product data
    });

    const savedRepair = await newRepair.save();
    res.status(201).json({
      message: "Repair created successfully",
      product: savedRepair, // Include the entire product object in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-offers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all offers associated with the user ID
    const userOffers = await Offer.find({ userId });

    // Send the array of offers in the response
    res.status(200).json({ offers: userOffers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-payments/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all payments associated with the user ID
    const userPayments = await Payment.find({ userId });

    // Send the array of payments in the response
    res.status(200).json({ payments: userPayments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/get-repairs/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all repairs associated with the user ID
    const userRepairs = await Repair.find({ userId });

    // Send the array of repairs in the response
    res.status(200).json({ repairs: userRepairs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-payment/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Fetch the product from the database by ID
    const payment = await Payment.findById(paymentId);

    // Check if the payment with the given ID exists
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }

    // Send the payment in the response
    res.status(200).json({ payment });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});
app.get("/get-payments", async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Fetch the product from the database by ID
    const payment = await Payment.find()

    // Check if the payment with the given ID exists
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }

    // Send the payment in the response
    res.status(200).json({ payment });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-offer/:id", async (req, res) => {
  try {
    const offerId = req.params.id;

    // Fetch the product from the database by ID
    const offer = await Offer.findById(offerId);

    // Check if the offer with the given ID exists
    if (!offer) {
      return res.status(404).json({ message: "offer not found" });
    }

    // Send the offer in the response
    res.status(200).json({ offer });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-repair", async (req, res) => {
  try {
    // Fetch all products from the database
    const repairs = await Repair.find();

    // Check if there are no products
    if (repairs.length === 0) {
      return res.status(404).json({ message: "No repair found" });
    }

    // Send the array of products in the response
    res.status(200).json({ repairs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-repair/:id", async (req, res) => {
  try {
    const repairId = req.params.id;

    // Fetch the product from the database by ID
    const repair = await Repair.findById(repairId);

    // Check if the repair with the given ID exists
    if (!repair) {
      return res.status(404).json({ message: "repair not found" });
    }

    // Send the repair in the response
    res.status(200).json({ repair });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the product from the database by ID
    const user = await User.findById(userId);

    // Check if the user with the given ID exists
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // Send the user in the response
    res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-offer", async (req, res) => {
  try {
    // Fetch all offer from the database
    const offers = await Offer.find();

    // Check if there are no offer
    if (offers.length === 0) {
      return res.status(404).json({ message: "No Offer found" });
    }

    // Send the array of offer in the response
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
