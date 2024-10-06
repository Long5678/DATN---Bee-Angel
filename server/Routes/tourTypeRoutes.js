const express = require('express');
<<<<<<< HEAD
const {
    addTourType,
    updateTourType,
    deleteTourType,
    getTourTypes,
    getTourTypeById
} = require('../Controllers/tourTypeController');
=======
const { addTourType, updateTourType , deleteTourType , getTourTypes } = require('../Controllers/tourTypeController');
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd

const router = express.Router();

router.post('/add', addTourType);
router.put('/edit/:id', updateTourType);
router.delete('/delete/:id', deleteTourType);
<<<<<<< HEAD
router.get('/detail/:id', getTourTypeById);
=======
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
router.get('/', getTourTypes);

module.exports = router;
