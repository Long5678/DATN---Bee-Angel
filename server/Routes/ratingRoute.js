const express = require("express")
const { createRating, getRatingByTour, checkUserRated, getAverageRatingForTour, countRatingsForTour } = require("../Controllers/ratingController")
const router = express.Router()

router.post("/create", createRating);
router.get("/:tourId", getRatingByTour);
router.get("/check/:userId/:tourId", checkUserRated);
router.get("/:tourId/average-rating", getAverageRatingForTour );
router.get("/:tourId/count-rating", countRatingsForTour );




module.exports = router;