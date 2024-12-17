const mongoose = require('mongoose');

const orderVehicleSchema = new mongoose.Schema({
  idCar: {
    type: String,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  numberOfMotorcycles: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true // trạng thái
  },
  task_status: { // If task_status is necessary for your logic
    type: String,
    required: true // đang giao hay đã hủy
  },
  amountPaid: {
    type: Number,
    required: true
  },
  pickUpDate: {
    type: Date, // Date type is more suitable for date fields
    required: true
  },
  returnDate: {
    type: Date, // Date type is more suitable for date fields
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String
  },
  licensePlate: [{
    type: String
  }],
  returnedLicensePlate: [{ // Thêm trường mới cho biển số xe được hoàn lại
    type: String
  }],
  cardFront: {
    type: String,
  },
  cardBack: {
    type: String,
  },
  previous_task_status: {
    type: String,
    default: null
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderVehicle', orderVehicleSchema);
