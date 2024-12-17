const express = require("express")
const {
  createRatingVehicle,
  getRatingByVehicle,
  checkUserRated,
  getAverageRatingForVehicle,
  countRatingsForVehicle,
  loadAllVehiclesWithRatings,
  countHelpFulAndNotHelpFul,
  getUserAction
} = require("../Controllers/ratingVehicleController")
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router()

router.get('/:id/UserAction', getUserAction);
router.get('/allVehicleWithRatings', loadAllVehiclesWithRatings);
router.post("/create", upload.fields([{
    name: "imageUrls",
    maxCount: 4
}]), createRatingVehicle);
router.get("/:idCar", getRatingByVehicle);
router.get("/check/:userId/:idCar", checkUserRated);
router.get("/:idCar/average-rating", getAverageRatingForVehicle);
router.get("/:idCar/count-rating", countRatingsForVehicle);
router.post("/HelpFulOrNot", countHelpFulAndNotHelpFul);




module.exports = router;
