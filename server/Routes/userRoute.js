const express = require("express")
const { registerUser, loginUser, findUser, getUsers, findUserByPhone, forgotPassword, resetPassword, upload, updateAvatar } = require("../Controllers/userController")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/findByPhone/:phone", findUserByPhone);
router.get("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/", getUsers);


module.exports = router;