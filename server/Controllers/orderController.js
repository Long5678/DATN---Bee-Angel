const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');
const Tour = require('../Models/tourModel'); // Mô hình Tour
const asyncHandler = require('express-async-handler');
const orderModel = require('../Models/orderModel');
const cron = require('node-cron');
const {
    resClientThanks,
    resClientRefund
} = require('./userController')
const UserModel = require('../Models/userModel');
const OrderModel = require('../Models/orderModel');
const userModel = require('../Models/userModel');
const {
    getAuth,
} = require('firebase/auth');
const {
    initializeApp
} = require("firebase/app");
const {
    getStorage
} = require("firebase/storage");
const {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject
} = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const app = initializeApp(firebaseConfig);
const storages = getStorage(app);
// Function to create a new order
const createOrder = async (req, res) => {
    try {
        const {
            idTour,
            idUser,
            numberOfPeople,
            numberOfChildren,
            status,
            amountPaid,
            mustPay,
            sale,
            depositPrice
        } = req.body;

        // Fetch the tour based on idTour
        const tour = await Tour.findById(idTour);

        if (!tour) {
            return res.status(404).json({
                message: 'Tour không tồn tại'
            });
        }

        const newOrder = new Order({
            idTour, // Already matches the schema
            idUser, // Ensure this matches the schema too
            numberOfPeople,
            numberOfChildren,
            status,
            amountPaid,
            mustPay,
            sale,
            depositPrice,
            totalPrice
        });
        console.log("đặt thành công")

        const savedOrder = await newOrder.save();
        return res.status(201).json({
            success: true,
            order: savedOrder
        });
    } catch (error) {
        console.error('Chi tiết lỗi:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};



// Function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Fetch all orders
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Function to get a specific order by order ID
const getOrderById = async (req, res) => {

    let {
        id
    } = req.params;

    try {
        const order = await Order.findById(id); // Find the order by ID
        if (!order) {
            return {
                success: false,
                error: "Order not found"
            };
        }

        return res.status(200).json(order)
    } catch (error) {
        console.error('Error fetching order by ID:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
};

const getOrdersByTourId = async (tourId) => {
    try {
        const orders = await Order.find({
            tourId: tourId
        }); // Filter orders by tourId
        return {
            success: true,
            orders
        };
    } catch (error) {
        console.error('Error fetching orders by tourId:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
};

const deleteOder = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        // Make sure to pass the filter object to find by `_id`
        const order = await Order.findOneAndDelete({
            _id: id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error
        });
    }
};

// Function to get all orders by user ID
const getOrdersByUserId = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const orders = await Order.find({
            idUser: id
        }); // Lọc các đơn hàng theo UserId
        res.status(200).json(orders)
        return {
            success: true,
            orders
        };
    } catch (error) {
        console.error('Error fetcahing orders by userId:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
};

const calculateRefundAmount = async (req, res) => {
    const {
        orderId,
        depositAmount,
        departureDate,
        totalAmountPaid
    } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const bookingDate = new Date(order.createdAt); // Thời gian đặt tour
        const cancellationDate = new Date(); // Ngày hủy là thời điểm hiện tại
        console.log("thời gian hủy đơn ", cancellationDate)

        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
        console.log("thời gian 1 ngày: ", oneDay)
        const bookingTimeDiff = Math.abs(cancellationDate.getTime() - bookingDate.getTime());
        console.log("Khoản cách thời đặt và thời gian hủy: ", bookingTimeDiff)
        const timeToDeparture = Math.max(0, Math.ceil((new Date(departureDate).getTime() - cancellationDate.getTime()) / oneDay));
        console.log("khoản cách giữa ngày hủy đơn và ngày khỏi hành là còn bn ngày: ", timeToDeparture)

        let refundPercentage = 100; // Mặc định hoàn tiền 100% nếu hủy trong 24 giờ

        if (bookingTimeDiff > oneDay) {
            if (totalAmountPaid === depositAmount) {
                if (timeToDeparture >= 4) {
                    refundPercentage = 70; // Mất 30% nếu còn hơn 4 ngày trước khi khởi hành
                } else {
                    refundPercentage = 0; // Mất 100% nếu trong vòng 4 ngày trước khi khởi hành
                }
                console.log("Trường hợp thanh toán toàn bộ: Phần trăm hoàn tiền:", refundPercentage, totalAmountPaid, depositAmount);
            }
            // Trường hợp 3: Đã thanh toán toàn bộ (100%)
            else {

                if (timeToDeparture >= 7) {
                    refundPercentage = 50; // Mất 50% số tiền đặt cọc nếu còn hơn 7 ngày
                } else {
                    refundPercentage = 0; // Mất 100% tiền đặt cọc nếu trong vòng 7 ngày trước khi khởi hành
                }
                console.log("Trường hợp đặt cọc: Phần trăm hoàn tiền:", refundPercentage);
            }
        }

        const conlaicuakhach = (depositAmount * refundPercentage) / 100;

        refundAmount = depositAmount - conlaicuakhach // số tiền khách mất
        console.log("số phần trăm:", refundPercentage)
        console.log(conlaicuakhach)
        console.log("số tiền khách mất : ", refundAmount)
        console.log("số tiền hoàn : ", conlaicuakhach)

        res.status(200).json({
            success: true,
            refundAmount,
            refundPercentage
        });

        order.returnPay = conlaicuakhach;
        await order.save();
    } catch (error) {
        console.error('Error calculating refund amount:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


const cancelOrder = async (req, res) => {
    const {
        orderId
    } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Cập nhật trạng thái đơn hàng thành 'Đã hủy'
        order.task_status = 'Đã hủy';
        await order.save();

        res.status(200).json(
            order,
        );
    } catch (error) {
        console.error('Error cancelling order:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update order status after full payment
const updateOrderStatus = async (req, res) => {
    const {
        idOrder,
        paidAmount
    } = req.body;


    try {
        const order = await Order.findById(idOrder);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if ((paidAmount + order.depositPrice) >= order.sale) {
            order.status = 'Hoàn thành';
        } else(
            order.status = 'Đặt cọc'
        )


        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating order',
            error: error.message
        });
    }
};


const updateTourStatus = async () => {
    try {
        const orders = await Order.find(); // Fetch all orders from the database
        const currentDate = new Date();
        console.log("Ngày hiện tại:", currentDate);

        await Promise.all(orders.map(async (order) => {
            const orderData = await OrderModel.findById(order._id);
            const user = await UserModel.findById(order.idUser);
            const departureDate1 = order.departureDate;
            const returnDate1 = order.returnDate;

            const [dayDep, monthDep, yearDep] = departureDate1.split('/');
            const departureDate = new Date(`${yearDep}-${monthDep}-${dayDep}`);
            const [dayRet, monthRet, yearRet] = returnDate1.split('/');
            const returnDate = new Date(`${yearRet}-${monthRet}-${dayRet}`);

            if (departureDate <= currentDate && currentDate <= returnDate) {
                console.log("Trạng thái: Đang diễn ra");
                if (order.task_status !== 'Đang diễn ra' && order.task_status !== 'Chờ xác nhận' && order.task_status !== 'Đã hủy' && order.status !== 'Đã hoàn') {
                    // Update only the task_status field
                    await Order.updateOne({
                        _id: order._id
                    }, {
                        $set: {
                            task_status: 'Đang diễn ra'
                        }
                    });
                }
            } else if (currentDate > returnDate) {
                console.log("Trạng thái: Hoàn tất");
                if (order.task_status !== 'Hoàn tất' && order.task_status !== 'Chờ xác nhận' && order.task_status !== 'Đã hủy' && order.status !== 'Đã hoàn') {
                    // Update only the task_status field
                    await Order.updateOne({
                        _id: order._id
                    }, {
                        $set: {
                            task_status: 'Hoàn tất'
                        }
                    });
                    await resClientThanks({
                        query: {
                            email: user.email,
                            id: orderData._id
                        }
                    }); // Send thank-you email once
                }
            }
        }));

        console.log("Cập nhật trạng thái tour thành công!");
    } catch (error) {
        console.error("Error updating tour status:", error);
    }
};

cron.schedule('*/20 * * * *', () => {
    console.log("Cập nhật trạng thái tour sau mỗi 20 phút.");
    updateTourStatus();
});
// 

//  hàm này sẽ load tất cả order dựa vào task status 
const getOrderByTaskStatus = async (req, res) => {
    const {
        task_status
    } = req.query;

    try {

        // Tìm kiếm đơn hàng theo task_status
        const orders = await orderModel.find({
            task_status: task_status
        });

        // Kiểm tra xem có đơn hàng nào không
        if (orders.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng nào."
            });
        }

        // Trả về danh sách đơn hàng tìm được
        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình lấy đơn hàng."
        });
    }
};


// ham này sẽ load tất cả order dựa vào task status và id user
const getOrderByTaskStatusByIdUser = async (req, res) => {
    const {
        task_status,
        idUser
    } = req.query;

    try {
        // Tìm kiếm đơn hàng theo task_status và idUser
        const orders = await orderModel.find({
            task_status: task_status,
            idUser: idUser // Giả sử trong orderModel có thuộc tính userId để lưu trữ ID của người dùng
        });

        // Kiểm tra xem có đơn hàng nào không
        if (orders.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng nào."
            });
        }

        // Trả về danh sách đơn hàng tìm được
        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Có lỗi xảy ra trong quá trình lấy đơn hàng."
        });
    }
};


const updateOrder = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        idTour,
        idUser,
        departureDate,
        returnDate,
        task_status
    } = req.body;

    console.log("dữ liệu order đưa vô", idTour, idUser, departureDate, returnDate, task_status);


    // Nhận danh sách ảnh cũ từ body, để tí kiểm tra là mảng ảnh này với mảng ảnh trong mông
    const existingImagesFront = JSON.parse(req.body.existingImagesFront || '');
    const existingImagesBack = JSON.parse(req.body.existingImagesBack || '');
    console.log("ảnh cũ ko thay đổi", existingImagesFront, existingImagesBack);

    try {
        const uploadImages = [];
        // Kiểm tra tồn tại của Order
        const order = await orderModel.findById(id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Cập nhật thông tin cơ bản của Order
        order.idTour = idTour || order.idTour;
        order.departureDate = departureDate || order.departureDate;
        order.returnDate = returnDate || order.returnDate;
        order.task_status = task_status || order.task_status;

        // Kiểm tra tồn tại của User
        const user = await userModel.findById(idUser);
        console.log("dòng 521", user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (req.files['imagesFront'] && req.files['imagesFront'].length > 0) {
            console.log("có vô ảnh");

            // Xóa ảnh cũ nếu tồn tại
            if (user.cardImages[0]) {
                const oldFrontImageRef = ref(storages, user.cardImages[0]);
                await deleteObject(oldFrontImageRef)
                    .then(() => console.log("Old front card image deleted successfully"))
                    .catch(error => console.error("Error deleting old front card image:", error));
            }

            // Tải ảnh mới lên
            const file = req.files['imagesFront'][0];
            const storageRef = ref(storages, `cards/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype
            };

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            uploadImages.push(file.originalname); // Lưu URL ảnh mới
        } else {
            uploadImages.push(user.cardImages[0]); // Giữ ảnh cũ nếu không cập nhật
        }

        // Xử lý ảnh mặt sau (backCard)
        if (req.files['imagesBack'] && req.files['imagesBack'].length > 0) {
            // Xóa ảnh cũ nếu tồn tại
            if (user.cardImages[1]) {
                const oldBackImageRef = ref(storages, user.cardImages[1]);
                await deleteObject(oldBackImageRef).then(() => console.log("Old back card image deleted successfully"))
                    .catch(error => console.error("Error deleting old back card image:", error));
            }

            // Tải ảnh mới lên
            const file = req.files['imagesBack'][0];
            const storageRef = ref(storages, `cards/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype
            };

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            // const downloadURL = await getDownloadURL(snapshot.ref);
            uploadImages.push(file.originalname); // Lưu URL ảnh mới
        } else {
            uploadImages.push(user.cardImages[1]); // Giữ ảnh cũ nếu không cập nhật
        }


        // Cập nhật lại cardImages vào User
        user.cardImages = uploadImages;
        await user.save();

        // Lưu thay đổi vào Order
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({
            message: error.message
        });
    }
});


const getOrderByNam44 = async (req, res) => {
    const {
        orderCode
    } = req.query; // orderCode nhập vào từ nhân viên

    try {
        // Kiểm tra nếu orderCode có chứa tiền tố "BAG-" và loại bỏ nó
        let codeToMatch = orderCode.startsWith("BAG-" && "bag-") ? orderCode.slice(4) : orderCode;

        // Chuyển codeToMatch thành chữ thường
        codeToMatch = codeToMatch.toLowerCase();

        let orders = await OrderModel.find(); // Lấy tất cả đơn hàng

        // Kiểm tra nếu orders có dữ liệu
        if (orders.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy đơn hàng nào.'
            });
        }

        // Lọc các đơn hàng có 5 ký tự cuối của _id trùng với codeToMatch
        const matchedOrders = orders.filter(order => {
            // Cắt 5 ký tự cuối của _id, chuyển thành chữ thường
            const lastFiveChars = order._id.toString().slice(-5).toLowerCase();
            // So sánh codeToMatch với 5 ký tự cuối
            return lastFiveChars.includes(codeToMatch);
        });

        // Nếu không tìm thấy đơn hàng nào khớp
        if (matchedOrders.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy đơn hàng nào khớp với mã đơn hàng.'
            });
        }

        // Trả về kết quả
        res.status(200).json(matchedOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            message: 'Lỗi khi tìm kiếm đơn hàng.',
            error: error.message
        });
    }
};

const updatestatusOrder = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        task_status
    } = req.body;

    const order = await orderModel.findById(id);
    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    order.task_status = task_status || order.task_status;

    try {
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({
            message: "Failed to update order",
            error
        });
    }
});

const updatestatusRefundOrder = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        status
    } = req.body;

    const order = await orderModel.findById(id);
    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    const user = await UserModel.findById(order.idUser);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    order.status = status || order.status;

    try {
        await order.save();

        // Gửi email thông báo hoàn tiền nếu trạng thái là "Đã hoàn"
        if (status === "Đã hoàn") {
            const refundResult = await resClientRefund({
                email: user.email,
                id: order._id
            });
            res.status(200).json({
                message: "gỡi mail hoàn tiền thành công !",
                order,
                refundResult
            });
        } else {
            res.status(200).json({
                message: "Order status updated successfully.",
                order
            });
        }
    } catch (error) {
        console.error("Error saving order or sending refund email:", error);
        res.status(500).json({
            message: "Failed to update order or send refund email",
            error
        });
    }
});



module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByTourId,
    deleteOder,
    cancelOrder,
    calculateRefundAmount,
    getOrdersByUserId,
    updateOrderStatus,
    getOrderByTaskStatus,
    updateTourStatus,
    updateOrder,
    getOrderByNam44,
    getOrderByTaskStatusByIdUser,
    updatestatusOrder,
    updatestatusRefundOrder
};