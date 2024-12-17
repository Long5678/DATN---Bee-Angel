const express = require("express")
const {
    createComment,
    replyToComment,
    getCommentsByTourId,
    updateComment,
    deleteComment,
    getCommentsById,
    loadAllToursWithComments
} = require("../Controllers/commentController")
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router()

router.get('/allTourWithComments', loadAllToursWithComments);
router.get("/:tourId", getCommentsByTourId);
router.post("/create", upload.fields([{
    name: "image",
    maxCount: 4
}]), createComment);
router.put('/edit/:commentId', upload.fields([{
    name: 'image',
    maxCount: 4
}]), updateComment);
router.delete('/del/:commentId', deleteComment);
router.post("/:commentId/reply", replyToComment);
router.get("/detail-comment/:id", getCommentsById);





module.exports = router;