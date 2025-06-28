const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');


const getDealerVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ dealer: req.user._id });
    res.status(200).json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};


const createVehicle = async (req, res) => {
  const { title, brand, model, year, pricePerDay, fuelType, seats, description, images } = req.body;

  try {
    const vehicle = await Vehicle.create({
      dealer: req.user._id,
      title,
      brand,
      model,
      year,
      pricePerDay,
      fuelType,
      seats,
      images
    });

    res.status(201).json({ message: 'Vehicle created', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create vehicle' });
  }
};


const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, dealer: req.user._id });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found or not yours' });

    Object.assign(vehicle, req.body);
    await vehicle.save();

    res.status(200).json({ message: 'Vehicle updated', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
};


const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, dealer: req.user._id });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found or not yours' });

    await vehicle.deleteOne();
    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
};


const getDealerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ dealer: req.user._id })
      .populate('vehicle', 'title model')
      .populate('user', 'name email');

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

module.exports = {
  getDealerVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getDealerBookings
};
