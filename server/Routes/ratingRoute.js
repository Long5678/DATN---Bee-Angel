const express = require("express")
const {
    createRating,
    getRatingByTour,
    addReplyToRating,
    checkUserRated,
    getAverageRatingForTour,
    countRatingsForTour,
    loadAllToursWithRatings,
    countHelpFulAndNotHelpFul,
    getUserAction,
    deleteRating
} = require("../Controllers/ratingController")
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router()

router.get('/:id/UserAction', getUserAction);
router.get('/allTourWithRatings', loadAllToursWithRatings);
router.post("/create", upload.fields([{
    name: "imageUrls",
    maxCount: 4
}]), createRating);
router.get("/:tourId", getRatingByTour);
router.get("/check/:userId/:tourId", checkUserRated);
router.get("/:tourId/average-rating", getAverageRatingForTour);
router.get("/:tourId/count-rating", countRatingsForTour);
router.post("/HelpFulOrNot", countHelpFulAndNotHelpFul);
router.delete("/del/:id", deleteRating);



module.exports = router;