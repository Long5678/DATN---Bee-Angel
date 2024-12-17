const express = require('express');
const {
    addLoaiXe,
    updateLoaiXe,
    deleteLoaiXe,
    getLoaiXes,
    getLoaiXesById
} = require('../Controllers/vehicleTypeController');

const router = express.Router();

router.post('/add', addLoaiXe);
router.put('/edit/:id', updateLoaiXe);
router.delete('/delete/:id', deleteLoaiXe);
router.get('/detail/:id', getLoaiXesById);
router.get('/', getLoaiXes);

module.exports = router;
