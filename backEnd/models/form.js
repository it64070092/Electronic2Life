const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  offerImage: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
  status: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
