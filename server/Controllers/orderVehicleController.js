const asyncHandler = require('express-async-handler');
const cron = require('node-cron');
const VehicleModel = require('../Models/vehicleModel');
const OrderVehicle = require('../Models/orderVehicleModel');
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




const createOrderVehicle = async (req, res) => {

  try {

    const {
      idCar,
      idUser,
      numberOfMotorcycles,
      pickUpDate,
      returnDate,
      status,
      totalPrice,
      task_status,
      paymentMethod,
      shippingAddress,
      licensePlate,
      cardFront,
      cardBack,
    } = req.body;
    console.log('licensePlate11111', licensePlate);

    if (!Array.isArray(licensePlate)) {
      return res.status(400).json({
        message: "Biển số xe phải là một mảng"
      });
    }
    const uploadImages = [];

    const uploadFile = async (fileInfo) => {
      const storageRef = ref(storages, `cardVerhical/${fileInfo.name}`);
      const metadata = {
        contentType: fileInfo.type,
      };

      const buffer = Buffer.from(fileInfo.data, 'base64');
      const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    };

    if (cardFront) {
      const frontDownloadURL = await uploadFile(cardFront);
      uploadImages.push(frontDownloadURL);
    }

    if (cardBack) {
      const backDownloadURL = await uploadFile(cardBack);
      uploadImages.push(backDownloadURL);
    }

    if (!idCar || !idUser || !numberOfMotorcycles || numberOfMotorcycles <= 0 || !pickUpDate || !returnDate || !shippingAddress) {
      return res.status(400).json({
        message: 'Thiếu thông tin cần thiết'
      });
    }

    const vehicle = await VehicleModel.findById(idCar);
    if (!vehicle) {
      return res.status(404).json({
        message: 'Xe không tồn tại'
      });
    }

    const pickUpDateConverted = new Date(pickUpDate);
    const returnDateConverted = new Date(returnDate);

    if (returnDateConverted < pickUpDateConverted) {
      return res.status(400).json({
        message: 'Ngày trả xe phải lớn hơn hoặc bằng ngày lấy xe'
      });
    }

    if (!pickUpDateConverted || !returnDateConverted) {
      return res.status(400).json({
        message: 'Ngày không hợp lệ'
      });
    }

    if (isNaN(numberOfMotorcycles)) {
      return res.status(400).json({
        message: 'Số lượng xe không hợp lệ'
      });
    }

    const newOrder = new OrderVehicle({
      idCar,
      idUser,
      numberOfMotorcycles,
      licensePlate: licensePlate || [],
      pickUpDate: pickUpDateConverted,
      returnDate: returnDateConverted,
      status,
      task_status,
      amountPaid: totalPrice,
      shippingAddress,
      totalPrice,
      paymentMethod,
      cardFront: uploadImages[0],
      cardBack: uploadImages[1],
    });

    await newOrder.save();
    // console.log('New Order Saved:', newOrder);

    res.status(201).json({
      message: 'Đơn hàng đã được tạo thành công',
      newOrder,
    });
  } catch (error) {
    // console.error('Lỗi khi tạo đơn hàng:', error.message, error.stack);
    res.status(500).json({
      message: 'Lỗi máy chủ'
    });
  }
};


// Function to get all orders
const getAllOrderVehicle = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await OrderVehicle.find();

    // Check if no orders found
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng nào'
      });
    }

    // Return orders
    return res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ',
      error: error.message
    });
  }
};


//  hàm này sẽ load tất cả order dựa vào task status 
const getOrderByTaskStatus = async (req, res) => {
  const {
    task_status
  } = req.query;

  try {

    // Tìm kiếm đơn hàng theo task_status
    const orders = await OrderVehicle.find({
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



// Hàm này sẽ load tất cả xe dựa vào task_status
const getOrderVehiclesByTaskStatusUser = async (req, res) => {
  const {
    task_status,
    idUser
  } = req.query;

  try {
    // Tìm kiếm xe theo task_status
    const orders = await OrderVehicle.find({
      task_status: task_status,
      idUser: idUser
    });

    // Kiểm tra xem có xe nào không
    if (orders.length === 0) {
      return res.status(404).json({
        message: "Không có đơn hàng nào!"
      });
    }

    // Trả về danh sách xe tìm được
    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Có lỗi xảy ra trong quá trình lấy danh sách xe."
    });
  }
};



const getOrdersByUserId = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    // Lọc các đơn hàng theo `idUser`
    const orders = await OrderVehicle.find({
      idUser: id
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user"
      });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders by userId:', error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


const calculateRefundAmount = async (req, res) => {
  const {
    orderId,
    pickUpDate
  } = req.body;

  try {
    // Tìm đơn hàng
    const order = await OrderVehicle.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại'
      });
    }

    const totalAmountPaid = order.totalPrice;
    const cancellationDate = new Date(); // Thời điểm hủy
    const pickUpTime = new Date(pickUpDate); // Thời điểm nhận xe

    // Tính khoảng thời gian còn lại (miliseconds)
    const timeLeft = pickUpTime - cancellationDate;
    const fifteenMinutes = 15 * 60 * 1000;

    // Kiểm tra nếu hủy trước 15 phút
    if (timeLeft >= fifteenMinutes) {
      return res.status(200).json({
        success: true,
        refundAmount: totalAmountPaid,
        refundPercentage: 100,
        message: 'Hủy trước 15 phút, hoàn lại toàn bộ tiền'
      });
    }

    // Nếu hủy sau 15 phút (hoặc ít hơn 15 phút trước khi đón)
    return res.status(200).json({
      success: true,
      refundAmount: 0,
      refundPercentage: 0,
      message: 'Hủy sau 15 phút, không được hoàn tiền'
    });

  } catch (error) {
    console.error('Lỗi khi tính toán số tiền hoàn lại:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ',
      error: error.message
    });
  }
};




const cancelOrderVehicle = async (req, res) => {
  const {
    orderId
  } = req.body;

  try {
    const order = await OrderVehicle.findById(orderId); // Sử dụng OrderVehicle thay vì Order

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Đơn hàng không tồn tại'
      });
    }

    // Chuyển biển số từ licensePlate sang returnedLicensePlate
    order.returnedLicensePlate = [...order.licensePlate];
    order.licensePlate = []; // Xóa biển số từ licensePlate


    // Cập nhật trạng thái đơn hàng thành 'Đã hủy'
    order.task_status = 'Đã hủy';
    await order.save();

     res.status(200).json(
       order,
     );
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error.message);
    res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ',
      error: error.message
    });
  }
};



const updateOrderVehicle = asyncHandler(async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      idCar,
      pickUpDate,
      returnDate,
      task_status,
      shippingAddress
    } = req.body;

    // Find the order by ID
    const order = await OrderVehicle.findById(id);
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    // Only update fields if they are provided in the request body
    if (idCar) order.idCar = idCar;
    if (pickUpDate) order.pickUpDate = new Date(pickUpDate);
    if (returnDate) order.returnDate = new Date(returnDate);
    if (task_status) order.task_status = task_status;
    if (shippingAddress) order.shippingAddress = shippingAddress;

    // Calculate dayDifference if pickUpDate and returnDate are provided
    if (pickUpDate && returnDate) {
      const pickUp = new Date(pickUpDate);
      const returnD = new Date(returnDate);

      const timeDifference = returnD - pickUp;
      const calculatedDayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days

      order.dayDifference = calculatedDayDifference;
    }

    // Save the updated order
    await order.save();

    // Respond with the updated order
    res.status(200).json(order);
  } catch (error) {
    // Catch and return any errors
    console.error("Error updating order:", error);
    res.status(500).json({
      message: 'Error updating order',
      error: error.message
    });
  }
});



const getOrderVehicleById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const order = await OrderVehicle.findById(id); // Using the correct model for order vehicles
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    return res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order by ID:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const updateOrderVehicleStatus = async (req, res) => {
  const {
    orderVehicleId,
    amountPaid
  } = req.body;

  try {
    const order = await OrderVehicle.findById(orderVehicleId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (amountPaid >= order.totalAmount) {
      order.status = 'Hoàn thành'; // Completed
    }
    order.amountPaid = amountPaid; // Update the paid amount if needed

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


const updateCarRentalStatus = async (req = null, res = null) => {
  try {
    const orders = await OrderVehicle.find();
    const currentDate = new Date();

    await Promise.all(orders.map(async (order) => {
      const pickUpDate1 = order.pickUpDate;
      const returnDate1 = order.returnDate;

      if (!pickUpDate1 || !returnDate1) {
        console.error("Ngày đi hoặc ngày về không tồn tại trong dữ liệu đơn hàng.");
        return;
      }

      // Assuming pickUpDate1 and returnDate1 are Date objects
      const departureDate = new Date(pickUpDate1);
      const returnDate = new Date(returnDate1);

      // Nếu ngày hiện tại trước ngày đi (chưa đến ngày thuê)
      if (departureDate <= currentDate && currentDate <= returnDate) {
        order.task_status = 'Đặt xe thành công';
      }
      // Nếu ngày hiện tại trong khoảng từ ngày đi đến ngày về (xe đang thuê)
      else if (currentDate < departureDate) {
        order.task_status = 'Đang diễn ra';
      }
      // Nếu ngày hiện tại đã qua ngày trả xe (thuê xong)
      else if (currentDate > returnDate) {
        order.task_status = 'Hoàn tất';
      }

      await order.save();
    }));

    console.log("Cập nhật trạng thái xe thành công!");

    if (res) {
      res.status(200).json({
        message: "Cập nhật trạng thái xe thành công!"
      });
    }
  } catch (error) {
    console.error("Error updating car status:", error);
    if (res) {
      res.status(500).json({
        message: "Đã xảy ra lỗi khi cập nhật trạng thái xe."
      });
    }
  }
};


cron.schedule('0 0 * * *', () => {
  console.log("update order task");
  updateCarRentalStatus();
});


const getOrderByNameVehicle = async (req, res) => {
  const {
    orderCodeVehicle
  } = req.query; // orderCodeVehicle nhập vào từ nhân viên

  console.log("ccccc", orderCodeVehicle);
  
  try {
    // Kiểm tra nếu `orderCodeVehicle` tồn tại
    if (!orderCodeVehicle) {
      return res.status(400).json({
        message: 'Vui lòng nhập mã đơn hàng.'
      });
    }

    // Kiểm tra và loại bỏ tiền tố "TRX-" hoặc "trx-"
    let codeToMatch = orderCodeVehicle.startsWith("TRX-") || orderCodeVehicle.startsWith("trx-") ?
      orderCodeVehicle.slice(4) :
      orderCodeVehicle;

    // Chuyển `codeToMatch` thành chữ thường
    codeToMatch = codeToMatch.toLowerCase();

    // Lấy tất cả đơn hàng
    let orders = await OrderVehicle.find();

    // Kiểm tra nếu orders rỗng
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy đơn hàng nào.'
      });
    }

    // Lọc các đơn hàng có 5 ký tự cuối của _id trùng với `codeToMatch`
    const matchedOrders = orders.filter(order => {
      const lastFiveChars = order._id.toString().slice(-5).toLowerCase();
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


const updatestatusOrderVehicle = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    task_status
  } = req.body;

  const order = await OrderVehicle.findById(id);
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

module.exports = {
  createOrderVehicle,
  getAllOrderVehicle,
  getOrderVehicleById,
  getOrdersByUserId,
  getOrderByTaskStatus,
  getOrderVehiclesByTaskStatusUser,
  calculateRefundAmount,
  cancelOrderVehicle,
  updateOrderVehicle,
  updateOrderVehicleStatus,
  updateCarRentalStatus,
  getOrderByNameVehicle,
  updatestatusOrderVehicle
};
