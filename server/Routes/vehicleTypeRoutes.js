const express = require('express');
const { addLoaiXe, updateLoaiXe, deleteLoaiXe, getLoaiXes } = require('../Controllers/vehicleTypeController');

const router = express.Router();

router.post('/add', addLoaiXe);
router.put('/edit/:id', updateLoaiXe);
router.delete('/delete/:id', deleteLoaiXe);
router.get('/', getLoaiXes);

module.exports = router;
