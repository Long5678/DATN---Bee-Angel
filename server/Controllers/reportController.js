const asyncHandler = require('express-async-handler');
const Order = require('../Models/orderModel')
const OrderVehicle = require('../Models/orderVehicleModel')


// tính tổng tiền đơn tour theo tháng
const totalPriceOrderByMonth = async (req,res) => {
   try {
     const currentYear = new Date().getFullYear();

     const revenueData = await Order.aggregate([{
         $match: {
           status: "Hoàn thành", // Chỉ tính đơn hàng hoàn thành
           createdAt: {
             $gte: new Date(`${currentYear}-01-01`),
             $lt: new Date(`${currentYear + 1}-01-01`),
           },
         },
       },
       {
         $group: {
           _id: {
             $month: "$createdAt"
           }, // Nhóm theo tháng
           totalRevenue: {
             $sum: "$totalPrice"
           }, // Tính tổng tiền
         },
       },
       {
         $sort: {
           _id: 1
         }, // Sắp xếp theo tháng
       },
     ]);

     // Tạo mảng đủ 12 tháng
     const result = Array.from({
       length: 12
     }, (_, i) => ({
       month: i + 1,
       totalRevenue: revenueData.find((data) => data._id === i + 1)?.totalRevenue || 0,
     }));

     res.status(200).json(result);
   } catch (err) {
     res.status(500).json({
       error: err.message
     });
   }
}




const priceTotalOrder = asyncHandler(async (req, res) => {
    try {
        // Đếm tổng số đơn đặt tour
        const totalOrdersTour = await Order.countDocuments();
    
        // Đếm tổng số đơn đặt xe
        const totalOrdersVehicle = await OrderVehicle.countDocuments();
    
        // Tổng số đơn
        const totalOrders = totalOrdersTour + totalOrdersVehicle;
    
        res.status(200).json({
          totalOrders: totalOrders
        });
      } catch (error) {
        console.error('Lỗi khi tính tổng số đơn:', error);
        res.status(500).json({ message: 'Lỗi khi lấy tổng số đơn' });
      }
})



const calculateTotalPercentage = asyncHandler(async (req, res) => {
  try {
      // Tính tổng số lượng đơn và tổng số tiền đã thanh toán từ bảng Order (Tour)
      const tourStats = await Order.aggregate([
          {
              $group: {
                  _id: null,
                  totalOrders: { $sum: 1 }, // Tính số lượng đơn
                  totalAmount: { $sum: "$amountPaid" } // Tổng số tiền đã thanh toán
              }
          }
      ]);

      // Tính tổng số lượng đơn và tổng số tiền đã thanh toán từ bảng OrderVehicle (Xe)
      const vehicleStats = await OrderVehicle.aggregate([
          {
              $group: {
                  _id: null,
                  totalOrders: { $sum: 1 }, // Tính số lượng đơn
                  totalAmount: { $sum: "$amountPaid" } // Tổng số tiền đã thanh toán
              }
          }
      ]);

      // Lấy số lượng đơn và tổng số tiền đã thanh toán từ các bảng
      const totalTourOrders = tourStats[0]?.totalOrders || 0;
      const totalTourAmount = tourStats[0]?.totalAmount || 0;
      const totalVehicleOrders = vehicleStats[0]?.totalOrders || 0;
      const totalVehicleAmount = vehicleStats[0]?.totalAmount || 0;

      // Tính tổng số lượng đơn và tổng số tiền đã thanh toán của cả hệ thống
      const totalOrders = totalTourOrders + totalVehicleOrders;
      const totalAmount = totalTourAmount + totalVehicleAmount;

      // Nếu tổng số đơn hoặc tổng số tiền bằng 0, trả về tỷ lệ là 0% để tránh chia cho 0
      if (totalOrders === 0 || totalAmount === 0) {
          return res.status(200).json({
              totalPercentage: "0%"
          });
      }

      // Tính tỷ lệ phần trăm số lượng đơn của Tour và Xe so với tổng số đơn
      const tourOrderPercentage = (totalTourOrders / totalOrders) * 100;
      const vehicleOrderPercentage = (totalVehicleOrders / totalOrders) * 100;

      // Tính tỷ lệ phần trăm số tiền đã thanh toán của Tour và Xe so với tổng số tiền đã thanh toán
      const tourAmountPercentage = (totalTourAmount / totalAmount) * 100;
      const vehicleAmountPercentage = (totalVehicleAmount / totalAmount) * 100;

      // Kiểm tra chi tiết tỷ lệ phần trăm
      console.log("Tour Order Percentage:", tourOrderPercentage);
      console.log("Vehicle Order Percentage:", vehicleOrderPercentage);
      console.log("Tour Amount Percentage:", tourAmountPercentage);
      console.log("Vehicle Amount Percentage:", vehicleAmountPercentage);

      // Tính tỷ lệ chung: Trung bình của tỷ lệ phần trăm số lượng đơn và số tiền đã thanh toán
      const totalPercentage = (tourOrderPercentage + vehicleOrderPercentage + tourAmountPercentage + vehicleAmountPercentage) / 4;
      const totalPercentageRounded = Math.round(totalPercentage);
      // Trả về kết quả với tỷ lệ phần trăm chính xác
      res.status(200).json({
          totalPercentage: `${totalPercentageRounded}%`
      });

  } catch (error) {
      console.error("Lỗi khi tính toán:", error);
      res.status(500).json({ message: "Lỗi khi tính toán." });
  }
});


const calculateRevenue = async (req, res) => {
  try {
    const { year } = req.body;

    // Tạo một mảng chứa thông tin của 4 quý
    const quarters = [
      { startDate: new Date(year, 0, 1), endDate: new Date(year, 2, 31) }, // Quý 1
      { startDate: new Date(year, 3, 1), endDate: new Date(year, 5, 30) }, // Quý 2
      { startDate: new Date(year, 6, 1), endDate: new Date(year, 8, 30) }, // Quý 3
      { startDate: new Date(year, 9, 1), endDate: new Date(year, 11, 31) }, // Quý 4
    ];

    const revenueByQuarter = await Promise.all(
      quarters.map(async (quarter, index) => {
        // Tính doanh thu Tour
        const tourRevenue = await Order.aggregate([
          { $match: { createdAt: { $gte: quarter.startDate, $lte: quarter.endDate } } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);

        // Tính doanh thu Xe
        const vehicleRevenue = await OrderVehicle.aggregate([
          { $match: { createdAt: { $gte: quarter.startDate, $lte: quarter.endDate } } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);

        // Tổng doanh thu của quý
        const totalRevenue =
          (tourRevenue[0]?.totalRevenue || 0) + (vehicleRevenue[0]?.totalRevenue || 0);

        // Tỷ lệ phần trăm
        const tourPercentage = ((tourRevenue[0]?.totalRevenue || 0) / totalRevenue) * 100 || 0;
        const vehiclePercentage =
          ((vehicleRevenue[0]?.totalRevenue || 0) / totalRevenue) * 100 || 0;

        return {
          quarter: index + 1,
          totalRevenue,
          breakdown: {
            tour: {
              revenue: tourRevenue[0]?.totalRevenue || 0,
              percentage: tourPercentage.toFixed(2),
            },
            vehicle: {
              revenue: vehicleRevenue[0]?.totalRevenue || 0,
              percentage: vehiclePercentage.toFixed(2),
            },
          },
        };
      })
    );

    // Tổng hợp doanh thu cả năm
    const totalYearRevenue = revenueByQuarter.reduce((sum, q) => sum + q.totalRevenue, 0);

    res.status(200).json({
      year,
      totalYearRevenue,
      revenueByQuarter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};


//Danh sách doanh thu theo năm và từng quý
const getRevenueList = async (req, res) => {
  try {
    const { year } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      return res
        .status(400)
        .json({ message: "Năm không hợp lệ, vui lòng cung cấp năm hợp lệ." });
    }

    const quarters = [
      { startDate: new Date(year, 0, 1), endDate: new Date(year, 2, 31) },
      { startDate: new Date(year, 3, 1), endDate: new Date(year, 5, 30) },
      { startDate: new Date(year, 6, 1), endDate: new Date(year, 8, 30) },
      { startDate: new Date(year, 9, 1), endDate: new Date(year, 11, 31) },
    ];

    const revenueList = await Promise.all(
      quarters.map(async (quarter, index) => {
        const tourRevenue = await Order.aggregate([
          { $match: { createdAt: { $gte: quarter.startDate, $lte: quarter.endDate } } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);

        const vehicleRevenue = await OrderVehicle.aggregate([
          { $match: { createdAt: { $gte: quarter.startDate, $lte: quarter.endDate } } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);

        const totalRevenue =
          (tourRevenue[0]?.totalRevenue || 0) + (vehicleRevenue[0]?.totalRevenue || 0);

        return {
          quarter: index + 1,
          totalRevenue,
        };
      })
    );

    res.status(200).json({ year, revenueList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

//Chi tiết doanh thu
const getRevenueDetails = async (req, res) => {
  try {
    const { year, quarter } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      return res
        .status(400)
        .json({ message: "Năm không hợp lệ, vui lòng cung cấp năm hợp lệ." });
    }

    const startDate = quarter
      ? new Date(year, (quarter - 1) * 3, 1) // Đầu quý
      : new Date(year, 0, 1); // Đầu năm
    const endDate = quarter
      ? new Date(year, quarter * 3, 0) // Cuối quý
      : new Date(year, 11, 31); // Cuối năm

    const tourRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const vehicleRevenue = await OrderVehicle.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);

    const totalRevenue =
      (tourRevenue[0]?.totalRevenue || 0) + (vehicleRevenue[0]?.totalRevenue || 0);

    const tourPercentage = totalRevenue
      ? ((tourRevenue[0]?.totalRevenue || 0) / totalRevenue) * 100
      : 0;
    const vehiclePercentage = totalRevenue
      ? ((vehicleRevenue[0]?.totalRevenue || 0) / totalRevenue) * 100
      : 0;

    res.status(200).json({
      year,
      quarter: quarter || "All",
      totalRevenue,
      breakdown: {
        tour: {
          revenue: tourRevenue[0]?.totalRevenue || 0,
          percentage: tourPercentage.toFixed(2),
        },
        vehicle: {
          revenue: vehicleRevenue[0]?.totalRevenue || 0,
          percentage: vehiclePercentage.toFixed(2),
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};


module.exports = {
  totalPriceOrderByMonth,
  priceTotalOrder,
  calculateTotalPercentage,
  calculateRevenue,
  getRevenueList,
  getRevenueDetails
};
