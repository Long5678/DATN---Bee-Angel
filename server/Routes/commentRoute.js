const express = require("express")
const { createComment, replyToComment, getCommentsByTourId } = require("../Controllers/commentController")
const router = express.Router()

router.get("/:tourId", getCommentsByTourId);
router.post("/create", createComment);
router.post("/:commentId/reply", replyToComment);




module.exports = router;