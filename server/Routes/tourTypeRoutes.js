const express = require('express');
const {
    addTourType,
    updateTourType,
    deleteTourType,
    getTourTypes,
    getTourTypeById
} = require('../Controllers/tourTypeController');

const router = express.Router();

router.post('/add', addTourType);
router.put('/edit/:id', updateTourType);
router.delete('/delete/:id', deleteTourType);
router.get('/detail/:id', getTourTypeById);
router.get('/', getTourTypes);

module.exports = router;
