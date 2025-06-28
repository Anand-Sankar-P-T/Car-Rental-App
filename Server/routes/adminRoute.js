const express = require('express');
const router = express.Router();
const {getAllUsers,deleteUser,getAllVehicles,deleteVehicle} = require('../controllers/adminController');
const authAdmin = require('../middlewares/adminAuth');


router.get('/allusers', authAdmin, getAllUsers);

router.delete('/user/:id', authAdmin, deleteUser);

router.get('/allvehicles', authAdmin, getAllVehicles);

router.delete('/vehicle/:id', authAdmin, deleteVehicle);

module.exports = router;
