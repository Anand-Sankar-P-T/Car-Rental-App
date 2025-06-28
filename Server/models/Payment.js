const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  paymentMethod: { type: String, enum: ['stripe', 'razorpay', 'card', 'upi'] },
  status: { type: String, enum: ['success', 'pending', 'failed'], default: 'pending' },
  transactionId: String,
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
