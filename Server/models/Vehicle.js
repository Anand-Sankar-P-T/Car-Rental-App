const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  brand: String,
  model: String,
  year: Number,
  fuelType: String,
  seats: Number,
  pricePerDay: Number,
  images: [String],
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
