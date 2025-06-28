const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const bookVehicle = async (req, res) => {
  const { vehicleId, startDate, endDate, totalAmount } = req.body;

  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const booking = await Booking.create({
      user: req.user._id,
      vehicle: vehicle._id,
      dealer: vehicle.dealer,
      startDate,
      endDate,
      totalAmount
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to book vehicle' });
  }
};


const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('vehicle', 'title brand model pricePerDay')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

module.exports = {
  bookVehicle,
  myBookings,
  cancelBooking
};
