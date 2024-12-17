const express = require('express');
const router = express.Router();
const TourModel = require("../Models/tourModel")
const Order = require("../Models/orderModel")
const {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOder,
    cancelOrder,
    getOrdersByUserId,
    calculateRefundAmount,
    updateOrderStatus,
    getOrderByTaskStatus,
    updateTourStatus,
    updateOrder,
    getOrderByTaskStatusByIdUser,
    getOrderByNam44,
    updatestatusOrder,
    updatestatusRefundOrder
} = require('../Controllers/orderController');
const { image } = require('pdfkit');
const upload = require('../middlewares/uploadMiddleware');
router.get('/getOrderByNameAndDate', getOrderByNam44)   

router.put('/updatestatusOrder/:id',updatestatusOrder)
router.put('/updateOrder/:id', upload.fields([{
        name: 'imagesFront'
    },
    {
        name: 'imagesBack'
    }
]), updateOrder);
// router.post('/add', createOrder);
router.post('/add', async (req, res) => {
    const {
        orderCode,
        idTour,
        idUser,
        numberOfPeople,
        numberOfChildren,
        status,
        mustPay,
        priceHotel,
        namehotel,
        locationhotel,
        amountPaid,
        sale,
        depositPrice,
        totalPrice,
        departureDate,
        returnDate,
        task_status,
        paymentMethod,
    } = req.body;

    try {
        // Tìm thông tin tour từ idTour
        const tour = await TourModel.findById(idTour);

        if (!tour) {
            return res.status(404).json({
                message: 'Tour không tồn tại'
            });
        }

        // Tạo đơn hàng mới với thông tin từ tour và các thông tin từ frontend gửi lên
        const newOrder = new Order({
            orderCode,
            idTour,
            idUser,
            numberOfPeople,
            numberOfChildren,
            status,
            amountPaid,
            mustPay,
            priceHotel,
            namehotel,
            locationhotel,
            sale,
            depositPrice,
            totalPrice,
            departureDate,
            returnDate,
            task_status,
            paymentMethod
            // 
        });

        // Lưu đơn hàng vào database
        await newOrder.save();

        res.status(201).json({
            message: 'Đơn hàng đã được tạo thành công',
            newOrder
        });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({
            message: 'Lỗi máy chủ'
        });
    }
});

router.get('/all', getAllOrders);
router.get('/taskStatus', getOrderByTaskStatus)
router.get('/taskStatusByiduser', getOrderByTaskStatusByIdUser)

router.get('/:id', getOrderById);

router.delete('/delete/:id', deleteOder);

router.get('/orderUser/:id', getOrdersByUserId);

router.post('/sumOrder', calculateRefundAmount)

router.post('/timeOrder', cancelOrder);
router.post('/hoanthanh', updateOrderStatus)
router.put('/updateOrder/:id', updateOrder)
router.post('/loadTime', updateTourStatus)
router.put('/updatestatusOrderRefund/:id', updatestatusRefundOrder)


module.exports = router;