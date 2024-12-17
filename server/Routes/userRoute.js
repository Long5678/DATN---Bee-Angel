const express = require("express")
const {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    findUserByPhone,
    updateUser,
    forgotPassword,
    resClient,
    resClientHT,
    resetPassword,
    sendOTP,
    updatedCCCD,
    resClientCar,
    resClientHC,
    verifyOtp,
    findUerByRole,
    checkBlockedUser,
    confirmPassword,
    sendOTP_Register,
    verifyOTP_Register,
    // refreshAccessToken
} = require("../Controllers/userController")
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();


router.post("/sendOTPregister", sendOTP_Register)
router.post("/verifyOTPregister", verifyOTP_Register)

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/confirmPass", confirmPassword);
router.post("/updatedCCCD", upload.fields([{
        name: 'frontCard'
    },
    {
        name: 'backCard'
    }
]), updatedCCCD);
// router.post('/refresh-token', refreshAccessToken); // Route làm mới token
router.get("/find/:userId", findUser);
router.get("/findByPhone/:phone", findUserByPhone);
router.put("/updateUser/:userId", upload.single('avatar'), updateUser);
router.get("/forgotpassword", forgotPassword);
router.get("/resClient", resClient);
router.get("/resClientHT", resClientHT);
router.post("/verifyOtp", verifyOtp)
router.put("/resetpassword", resetPassword);
router.get("/", getUsers);
router.post("/send-otp", sendOTP); // Gửi mã OTP
router.get("/resClientCar", resClientCar);
router.get("/resClientHC", resClientHC);
router.get("/findUserRole", findUerByRole);
router.get("/checkBlockUser", checkBlockedUser);



module.exports = router;
