const express = require('express');
const router = express.Router();
const { handleCalculatePrice } = require('../Controllers/priceController');

// Định nghĩa route để tính giá tiền mà không chuyển trang
router.post('/calculate-price/:tourId', handleCalculatePrice);

module.exports = router;