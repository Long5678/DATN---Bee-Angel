const asyncHandler = require('express-async-handler');
const TourModel = require('../Models/tourModel');

const handleCalculatePrice = asyncHandler(async (req, res) => {
    const { tourId } = req.params;
    const { numberOfPeople, numberOfChildren } = req.body;

    if (numberOfPeople <= 0 || numberOfChildren < 0) {
        return res.status(400).json({
            message: "Số lượng người lớn phải lớn hơn 0 và số lượng trẻ em không được âm",
        });
    }

    const tour = await TourModel.findById(tourId);
    if (!tour) {
        return res.status(404).json({
            message: "Tour không tồn tại",
        });
    }

    const basePrice = tour.price;
    const additionalPricePerPerson = 50000;
    const additionalPricePerChild = 30000;

    // Hàm tính giá tiền dựa trên số lượng người lớn và trẻ em
    const calculatePrice = (basePrice, numberOfPeople, numberOfChildren) => {
        const adultTotalPrice = basePrice + (numberOfPeople - 1) * additionalPricePerPerson;
        const childrenTotalPrice = numberOfChildren * additionalPricePerChild;
        return adultTotalPrice + childrenTotalPrice;
    };

    // Tính giá tổng cộng
    const totalPrice = calculatePrice(basePrice, numberOfPeople, numberOfChildren);

    // Tính số tiền đặt cọc (50% của giá tổng cộng)
    const depositPrice = totalPrice * 0.5;

    const tienconlai = totalPrice - depositPrice

    return res.status(200).json({
        message: `Giá tiền cho ${numberOfPeople} người lớn và ${numberOfChildren} trẻ em là: ${totalPrice} VND`,
        totalPrice,
        depositPrice,
        tienconlai
    });
});

module.exports = { handleCalculatePrice };
