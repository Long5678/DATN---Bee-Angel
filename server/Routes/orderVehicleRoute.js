const express = require('express');
const {
  createOrderVehicle,
  getAllOrderVehicle,
  getOrdersByUserId,
  getOrderByTaskStatus,
  getOrderVehiclesByTaskStatusUser,
  calculateRefundAmount,
  cancelOrderVehicle,
  updateOrderVehicle,
  getOrderVehicleById,
  updateOrderVehicleStatus,
  updateCarRentalStatus,
  updatestatusOrderVehicle,
  getOrderByNameVehicle,
} = require('../Controllers/orderVehicleController');

const router = express.Router();

router.post('/add', createOrderVehicle);
router.get('/taskStatus', getOrderByTaskStatus)
router.get('/taskStatusByiduser', getOrderVehiclesByTaskStatusUser);
router.get('/getAll', getAllOrderVehicle);
router.get('/getOrderByNameVehicle', getOrderByNameVehicle)
router.get('/:id', getOrderVehicleById);
router.get('/orderUser/:id', getOrdersByUserId);
router.post('/sumOrder', calculateRefundAmount);
router.post('/timeOrder', cancelOrderVehicle);
router.put('/updateOrder/:id', updateOrderVehicle);
router.put('/update/:id', updateOrderVehicleStatus);
router.post('/loadTime/:id', updateCarRentalStatus);
router.put('/updatestatusOrderVehicle/:id', updatestatusOrderVehicle)
module.exports = router;
