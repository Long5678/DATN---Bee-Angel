const express = require('express');
const {
    addTour,
    updateTour,
    deleteTour,
    getAllTours,
    getTourById,
    getAllTourByIdDM,
    getTourByNameanDateTour,
    updateBookingsCount,
    getTopTour,
    updateIsDeleteTour,
    getAllToursAdmin
} = require('../Controllers/tourController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', getAllTours);
router.get('/getAllToursAdmin', getAllToursAdmin);
router.post('/add', upload.fields([{
        name: 'images',
        maxCount: 5
    },
    {
        name: 'videos',
        maxCount: 1
    }
]), addTour);
router.put('/edit/:id', upload.fields([{
        name: 'images',
        maxCount: 5
    },
    {
        name: 'videos',
        maxCount: 1
    }
]), updateTour);
router.delete('/delete/:id', deleteTour);
router.get('/detail/:id', getTourById);
router.get('/tourDM/:id', getAllTourByIdDM);
router.get('/getDateTouranName', getTourByNameanDateTour)
router.post('/book-count/:id', updateBookingsCount)
router.get('/get-top-tour', getTopTour);
router.get('/isDeleteTour/:id', updateIsDeleteTour)

module.exports = router;