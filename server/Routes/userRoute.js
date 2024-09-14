const express = require("express")
const { registerUser, loginUser, findUser, getUsers, findUserByPhone, upload, updateAvatar } = require("../Controllers/userController")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/findByPhone/:phone", findUserByPhone);
router.get("/", getUsers);


module.exports = router;