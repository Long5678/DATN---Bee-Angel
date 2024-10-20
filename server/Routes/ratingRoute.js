const express = require("express")
const { createRating, getRatingByTour, addReplyToRating, checkUserRated, getAverageRatingForTour } = require("../Controllers/ratingController")
const router = express.Router()

router.post("/create", createRating);
router.get("/:tourId", getRatingByTour);
router.get("/check/:userId/:tourId", checkUserRated);
router.get("/:tourId/average-rating", getAverageRatingForTour );




module.exports = router;