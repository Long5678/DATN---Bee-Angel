const asyncHandler = require("express-async-handler");
const vehicleModel = require("../Models/vehicleModel");

const handleVehiclePrice = asyncHandler(async (req, res) => {
  const {
    carId
  } = req.params;
  const {
    numberOfMotorcycles,
    pickUpDate,
    returnDate
  } = req.body;

  // Kiểm tra số lượng xe
  if (numberOfMotorcycles <= 0) {
    return res.status(400).json({
      message: "Số lượng xe phải lớn hơn 0"
    });
  }

  // Tìm xe theo ID
  const vehicle = await vehicleModel.findById(carId);
  if (!vehicle) {
    return res.status(404).json({
      message: "Xe không tồn tại"
    });
  }

  // Lấy giá cơ bản
  const basePrice = vehicle.price;

  // Tính số ngày thuê
  const startDate = new Date(pickUpDate);
  const endDate = new Date(returnDate);

  if (endDate < startDate) {
    return res.status(400).json({
      message: "Ngày trả xe phải lớn hơn hoặc bằng ngày nhận xe"
    });
  }

  const timeDiff = endDate - startDate + 1;
  const rentalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Tính số ngày thuê

  // Nếu rentalDays là 0, tính là 1 ngày
  const totalRentalDays = rentalDays === 0 ? 1 : rentalDays;

  // Tính tổng tiền
  const totalPrice = basePrice * numberOfMotorcycles * totalRentalDays;

  // Trả về tổng tiền
  return res.status(200).json({
    totalPrice
  });
});


module.exports = {
  handleVehiclePrice,
};
