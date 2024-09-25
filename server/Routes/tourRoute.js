const express = require('express');
const { addTour, updateTour, deleteTour, getAllTours, getTourById } = require('../Controllers/tourController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/add', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 1 }
]), addTour);
router.put('/edit/:id', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 1 }
]), updateTour);
router.delete('/delete/:id', deleteTour);

module.exports = router;
