const express = require('express');
const router = express.Router();
const authDealer = require('../middlewares/dealerAuth');
const { getDealerVehicles,createVehicle,updateVehicle,deleteVehicle,getDealerBookings} = require('../controllers/dealerController');

router.get('/vehicles', authDealer, getDealerVehicles);

router.post('/vehicles', authDealer, createVehicle);

router.put('/vehicles/:id', authDealer, updateVehicle);

router.delete('/vehicles/:id', authDealer, deleteVehicle);

router.get('/bookings', authDealer, getDealerBookings);

module.exports = router;
