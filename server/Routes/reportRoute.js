const express = require("express")
const {
    totalPriceOrderByMonth,
    priceTotalOrder,
    calculateTotalPercentage,
    calculateRevenue,
    getRevenueList,
    getRevenueDetails
} = require("../Controllers/reportController")

const router = express.Router();


// tính tổng tiền đơn tour theo tháng
router.get("/totalPriceOrderByMonth", totalPriceOrderByMonth);

//tính số lượng đơn
router.get("/total-orders", priceTotalOrder);
//tính tổng tỷ lệ trung bình phần trăm của số lượng đơn và tổng tiền đã thanh toán
router.get('/calculate-total-percentage', calculateTotalPercentage)
//tính tỷ lệ phần trăm năm có 4 quý
router.post('/revenue', calculateRevenue)
//lấy danh sách doanh thu theo năm và từng quý
router.post("/revenue/list", getRevenueList);
//chi tiết doanh thu
router.post("/revenue/details", getRevenueDetails); 

module.exports = router;
