const express = require("express")
const { createRating, getRatingByTour, addReplyToRating } = require("../Controllers/ratingController")
const router = express.Router()

router.get("/:tourId", getRatingByTour);
router.post("/create", createRating);



module.exports = router;