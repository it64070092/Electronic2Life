const mongoose = require('mongoose');

const RepairSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type : String,
    required : true
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
  repairImage: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
  status: {
    type: String, // Assuming the image filename will be stored as a string
    required: true,
  },
});

const Repair = mongoose.model('Repair', RepairSchema);

module.exports = Repair;
