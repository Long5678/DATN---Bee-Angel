const express = require("express")
const {
  createNotificationVehicle,
  getUserNotifications,
  markAllRead,
  checkTaskStatusChange,
  AllsNotify
} = require("../Controllers/notificationVehicleController.js")

const router = express.Router();

router.get('/Allnoti', AllsNotify)
router.post('/create', createNotificationVehicle);
router.post('/check-all-status', checkTaskStatusChange);
router.get('/:userId', getUserNotifications);
router.put('/read/:userId', markAllRead);



module.exports = router;
