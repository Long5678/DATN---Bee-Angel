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
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff

const router = express.Router();

router.post('/add', addTourType);
router.put('/edit/:id', updateTourType);
router.delete('/delete/:id', deleteTourType);
<<<<<<< HEAD
router.get('/detail/:id', getTourTypeById);
=======
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
router.get('/', getTourTypes);

module.exports = router;
