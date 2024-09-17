// routes/tourRoutes.js
const express = require('express');
const { addTour, updateTour, deleteTour } = require('../Controllers/tourController');
const router = express.Router();

router.post('/add', addTour);
router.put('/edit/:id', updateTour);
router.delete('/delete/:id', deleteTour);

module.exports = router;
