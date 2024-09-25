const express = require("express")
const { addComment, getCommentsByTour, deleteComment } = require("../Controllers/commentController")
const router = express.Router()

router.get("/:tourId", getCommentsByTour);
router.post("/create", addComment);
router.delete("/del/:id", deleteComment);




module.exports = router;