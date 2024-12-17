const express = require('express');
const router = express.Router();
const { handleVehiclePrice } = require('../Controllers/priceVehicleController');

// Định nghĩa route để tính giá tiền mà không chuyển trang
router.post('/:carId', handleVehiclePrice);

module.exports = router;
