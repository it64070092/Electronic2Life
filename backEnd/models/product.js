const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productImage: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
