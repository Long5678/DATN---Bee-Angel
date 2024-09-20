const express = require('express');
<<<<<<< HEAD
const {
    addTourType,
    updateTourType,
    deleteTourType,
    getTourTypes,
    getOneTourType
} = require('../Controllers/tourTypeController');
=======
const { addTourType, updateTourType , deleteTourType , getTourTypes } = require('../Controllers/tourTypeController');
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85

const router = express.Router();

router.post('/add', addTourType);
router.put('/edit/:id', updateTourType);
router.delete('/delete/:id', deleteTourType);
<<<<<<< HEAD
router.get('/detail/:id', getOneTourType);
=======
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85
router.get('/', getTourTypes);

module.exports = router;
