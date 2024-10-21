const express = require("express")
const {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    findUserByPhone,
    updateUser,
    forgotPassword,
    resetPassword,
    sendOTP,
    refreshAccessToken
} = require("../Controllers/userController")
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/refresh-token', refreshAccessToken); // Route làm mới token
router.get("/find/:userId", findUser);
router.get("/findByPhone/:phone", findUserByPhone);
router.put("/updateUser/:userId",upload.single('avatar'),updateUser);
router.get("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/", getUsers);
router.post("/send-otp", sendOTP); // Gửi mã OTP



module.exports = router;