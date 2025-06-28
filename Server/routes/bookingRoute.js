const express = require('express');
const router = express.Router();
const {bookVehicle,myBookings,cancelBooking} = require('../controllers/bookingController');

const authUser = require('../middlewares/userAuth')

router.post('/newBooking', authUser, bookVehicle);

router.get('/all', authUser, myBookings);

router.delete('/cancel/:id', authUser, cancelBooking);

module.exports = router;
