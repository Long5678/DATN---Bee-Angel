const asyncHandler = require('express-async-handler');
const TourModel = require('../Models/tourModel');

const handleCalculatePrice = asyncHandler(async (req, res) => {
    const {
        tourId
    } = req.params;
    const {
        numberOfPeople,
        numberOfChildren,
        numDay
    } = req.body;
    console.log("hàng 13", numDay);
    

    console.log(numberOfChildren, numberOfPeople);
    

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
    const additionalPricePerPerson = tour.price_Adult;
    const additionalPricePerChild = tour.price_Children;
    // const numDay = tour.numDay;

    // Hàm tính giá tiền dựa trên số lượng người lớn và trẻ em
    const calculatePrice = (basePrice, numberOfPeople, numberOfChildren, numDay) => {
        const adultTotalPrice = (basePrice * numDay) + (numberOfPeople - 1) * additionalPricePerPerson;
        const childrenTotalPrice = numberOfChildren * additionalPricePerChild;
        return adultTotalPrice + childrenTotalPrice;
    };

    // Tính giá tổng cộng
    const totalPrice = calculatePrice(basePrice, numberOfPeople, numberOfChildren, numDay);

    console.log(totalPrice);
    
    // sau khi giảm giá
    const sale = totalPrice * 0.9;

    // Tính số tiền đặt cọc (50% của giá tổng cộng)
    const depositPrice = sale * 0.5;

    // Không để kết quả âm
    const finalDepositPrice = Math.max(depositPrice, 0);
    const finalTienConLai = Math.max(sale - finalDepositPrice, 0);

    return res.status(200).json({
        message: `Giá tiền cho ${numberOfPeople} người lớn và ${numberOfChildren} trẻ em là: ${totalPrice} VND`,
        totalPrice,
        sale,
        depositPrice: finalDepositPrice,
        tienconlai: finalTienConLai
    });
});


module.exports = {
    handleCalculatePrice
};