const express = require('express');
<<<<<<< HEAD
const {
    addTour,
    updateTour,
    deleteTour,
    getAllTours,
    getTourById
} = require('../Controllers/tourController');
=======
const { addTour, updateTour, deleteTour, getAllTours } = require('../Controllers/tourController');
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', getAllTours);
router.post('/add', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 1 }
]), addTour);
router.put('/edit/:id', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 1 }
]), updateTour);
router.delete('/delete/:id', deleteTour);
<<<<<<< HEAD
router.get('/detail/:id', getTourById);
=======
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff

module.exports = router;
