const express = require("express")
const { createRating, getRatingByTour, addReplyToRating } = require("../Controllers/ratingController")
const router = express.Router()

router.get("/:tourId", getRatingByTour);
router.post("/create", createRating);
router.post("/:commentId/reply", addReplyToRating);


module.exports = router;