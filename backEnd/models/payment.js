const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentImage: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
  status: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
