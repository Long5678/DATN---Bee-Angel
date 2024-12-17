const notificationVehicle = require('../Models/notificationVehicleModel.js');
const cron = require('node-cron');
const OrderVehicle = require('../Models/orderVehicleModel');


// Lưu thông báo 
const createNotificationVehicle = async (req, res) => {
  const {
    orderId,
    message,
    userId,
    idCar,
    check,
    status
  } = req.body;
  console.log('lưu thành công: ', orderId, message);

  try {
    const newNotificationVehicle = new notificationVehicle({
      orderId,
      message,
      userId,
      idCar,
      check,
      status
    });

    await newNotificationVehicle.save();

    res.status(201).json({
      success: true,
      data: newNotificationVehicle,
      message: "Thông báo đã được lưu thành công.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lưu thông báo.",
      error: error.message,
    });
  }
};


// Lấy tất cả thông báo
const AllsNotify = async (req, res) => {
  try {
    const notis = await notificationVehicle.find();

    res.status(200).json(
      notis
    )
  } catch (error) {
    console.log(error);

  }

}


// Lấy thông báo của người dùng
const getUserNotifications = async (req, res) => {
  const {
    userId
  } = req.params;

  try {
    const notifications = await notificationVehicle.find({
      userId
    }).sort({
      date: -1
    });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thông báo.",
      error: error.message,
    });
  }
};


// Đánh dấu thông báo đã đọc
const markAllRead = async (req, res) => {
  try {
    const userId = req.params.userId;
    await notificationVehicle.updateMany({
      userId: userId,
      isRead: false
    }, {
      isRead: true
    });
    const updatedNotifications = await notificationVehicle.find({
      userId: userId
    });
    res.status(200).json(updatedNotifications);
  } catch (error) {
    res.status(500).json({
      error: "Không thể đánh dấu tất cả thông báo là đã đọc."
    });
  }
};



const checkTaskStatusChange = async () => {
  try {
    // Lấy danh sách các trạng thái hiện có trong cơ sở dữ liệu
    const distinctTaskStatuses = await OrderVehicle.distinct('task_status');

    if (!distinctTaskStatuses || distinctTaskStatuses.length === 0) {
      console.log('Không có trạng thái nào để kiểm tra.');
      return;
    }

    for (let task_status of distinctTaskStatuses) {
      // Bỏ qua trạng thái "Chờ xác nhận"
      if (task_status === "Chờ xác nhận") {
        console.log('Bỏ qua trạng thái "Chờ xác nhận".');
        continue;
      }

      console.log(`Đang kiểm tra trạng thái: ${task_status}`);

      // Lấy danh sách các đơn hàng có trạng thái hiện tại trùng với `task_status`
      const orders = await OrderVehicle.find({
        task_status
      });

      if (!orders || orders.length === 0) {
        console.log(`Không có đơn hàng nào với trạng thái: ${task_status}`);
        continue;
      }

      const dataSave = [];
      const notifications = []; // Mảng lưu các thông báo cần tạo mới

      for (let order of orders) {
        const currentStatus = order.previous_task_status; // Trạng thái trước đó của đơn hàng

        // Nếu trạng thái không thay đổi, bỏ qua
        if (currentStatus === task_status) {
          console.log(`Trạng thái của đơn hàng ${order._id} không thay đổi.`);
          continue;
        }

        console.log(`Đơn hàng ${order._id} đã thay đổi trạng thái từ ${currentStatus} thành ${task_status}`);

        // Cập nhật trạng thái cũ và trạng thái mới
        order.previous_task_status = task_status;
        order.task_status = task_status;

        // Tạo một thông báo mới
        const newNotificationVehicle = {
          orderId: order._id,
          userId: order.idUser,
          idCar: order.idCar,
          message: order.idCar,
          status: task_status,
        };
        notifications.push(newNotificationVehicle);

        // Lưu đơn hàng đã cập nhật vào mảng
        dataSave.push(order.save());
      }

      // Thực hiện lưu các đơn hàng cập nhật và thông báo mới vào cơ sở dữ liệu
      await Promise.all(dataSave);

      // Lưu các thông báo vào cơ sở dữ liệu
      if (notifications.length > 0) {
        await notificationVehicle.insertMany(notifications);
        console.log(`Đã tạo ${notifications.length} thông báo cho trạng thái: ${task_status}`);
      }
    }

    console.log('Hoàn tất kiểm tra và cập nhật trạng thái đơn hàng.');
  } catch (error) {
    console.error('Lỗi khi kiểm tra sự thay đổi trạng thái đơn hàng:', error);
  }
};



// Cấu hình cron job để chạy mỗi ngày vào lúc 00:00 (đêm khuya)
cron.schedule('*/20 * * * *', () => {
  console.log('Đang kiểm tra trạng thái đơn hàng hằng ngày...');
  checkTaskStatusChange();
});


// Hàm xóa thông báo quá hạn sau 7 ngày
const deleteExpiredNotifications = async () => {
  try {
    // Lấy thời gian hiện tại theo UTC
    const currentDate = new Date();
    console.log("Ngày hiện tại (UTC):", currentDate.toISOString());

    // Tạo ngày hết hạn (7 ngày trước) theo UTC
    const expiryDate = new Date(currentDate);
    expiryDate.setUTCDate(expiryDate.getUTCDate() - 6);

    console.log("Ngày hết hạn (UTC):", expiryDate.toISOString());

    // Tìm và hiển thị các thông báo sẽ bị xóa để kiểm tra
    const expiredNotifications = await notificationVehicle.find({
      date: {
        $lt: expiryDate
      }
    });
    console.log("Số lượng thông báo quá hạn:", expiredNotifications.length);
    if (expiredNotifications.length > 0) {
      console.log("Các thông báo quá hạn:", expiredNotifications);
    }

    // Xóa các thông báo quá hạn
    const result = await notificationVehicle.deleteMany({
      date: {
        $lt: expiryDate
      }
    });
    console.log(`Đã xóa ${result.deletedCount} thông báo quá hạn.`);
  } catch (error) {
    console.error("Lỗi khi xóa thông báo quá hạn:", error.message);
  }
};

// Cấu hình cron job để chạy mỗi ngày vào lúc 00:00 (đêm khuya)
cron.schedule('0 0 * * *', () => {
  console.log('Đang xóa thông báo quá hạn...');
  deleteExpiredNotifications();
});

module.exports = {
  createNotificationVehicle,
  getUserNotifications,
  markAllRead,
  checkTaskStatusChange,
  deleteExpiredNotifications,
  AllsNotify
};
