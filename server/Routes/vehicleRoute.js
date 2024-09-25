const express = require('express');
const { addVehicle, updateVehicle, deleteVehicle, getAllVehicles, getVehicleById } = require('../Controllers/vehicleController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/add', upload.fields([
    { name: 'images', maxCount: 5 }
]), addVehicle);
router.put('/edit/:id', upload.fields([
    { name: 'images', maxCount: 5 }
]), updateVehicle);
router.delete('/delete/:id', deleteVehicle);

module.exports = router;