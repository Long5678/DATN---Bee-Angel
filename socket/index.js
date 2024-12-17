const {
    Server
} = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173"
});

let onlineUser = []
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    //listen to a connection
    // tk này nó sẽ nhận cái userId mà bên client nó emit cái "addNewUser"
    socket.on("addNewUser", (userId) => {
        // nó sẽ nhận id user 
        // lấy mảng onlineUser mình sẽ some nó sẽ tìm xem có userID nào === useId của mình ko
        // nếu ko có thì reuturn về false mà có ! nên return về true 
        // vì return về true nên mình sẽ push cái userId và socketId vào mảng onlineUSer
        !onlineUser.some((user) => user.userId === userId) &&
            onlineUser.push({
                userId,
                socketId: socket.id
            })

        console.log("onlinerUser", onlineUser);

        // nó sẽ phát đi onlineUser cho client
        io.emit("getOnineUsers", onlineUser)
    });

    // add message && thông báo
    socket.on("sendMessage", (message) => {
        // recipientId có thể hiểu là id người nhận
        // tìm người nhận tin nhắn trong danh sách người đang online
        const user = onlineUser.find(user => user.userId === message.recipientId)

        if (user) {
            // kết nối đến socket của ngừi dùng đó và gửi sk getMessage
            io.to(user.socketId).emit("getMessage", message)

            // io.to(user.socketId).emit("getThongBao", {
            //     senderId: message.senderId,
            //     isRead: false, // check thông báo đọc hay chưa,
            //     data: new Date()
            // })
        }
    })

    // add thông báo
    socket.on("sendNotifiChat", (notifiChat) => {
        console.log("Đã nhận thông báo", notifiChat);

        // recipientId có thể hiểu là id người nhận
        const user = onlineUser.find(user => user.userId === notifiChat.recipientId)

        if (user) {
            console.log("ok gửi đi thông báo");

            io.to(user.socketId).emit("getThongBao", {
                _id: notifiChat._id,
                senderId: notifiChat.senderId,
                recipientId: notifiChat.recipientId,
                isRead: false, // check thông báo đọc hay chưa,
                data: new Date()
            })
        }
    })


    // Xử lý khi đặt hàng thành công
    socket.on("orderSuccess", (orderData) => {
        const user = onlineUser.find((user) => user.userId === orderData.orderNew.idUser);
        if (user) {
            console.log('Đang gửi thông báo cho người dùng:', user.socketId);
            io.to(user.socketId).emit("orderSuccessNotification", {
                message: orderData.orderNew.idTour,
                orderId: orderData.orderNew._id,
                userId: orderData.orderNew.idUser,
                tourId: orderData.orderNew.idTour,
                status: orderData.orderNew.task_status,
                date: new Date(),
                isRead: false,
                check: "tour"
            });
        }
    });

    // kiểm tra trạng thái đơn hàng
    socket.on("orderStatusChanged", async (orderData) => {
        try {
            const orderId = orderData?.orderStatus?._id;
            const tourId = orderData?.orderStatus?.idTour;
            const userId = orderData?.orderStatus?.idUser;
            const task_status = orderData?.orderStatus?.task_status;
            console.log("Dữ liệu nhận được từ socket:", orderData);
            console.log("Trạng thái đơn hàng:", task_status);

            const statusList = [
                "Hoàn tất",
                "Sẵn sàng khởi hành",
                "Đang diễn ra",
                "Đã hủy",
            ];

            if (statusList.includes(task_status)) {
                const user = onlineUser.find((user) => user.userId === orderData.orderStatus.idUser);

                if (user) {
                    io.to(user.socketId).emit("orderStatusNotification", {
                        orderId: orderData.orderStatus._id,
                        task_status,
                        tourId: orderData.orderStatus.idTour,
                        userId: orderData.orderStatus.idUser,
                        date: new Date(),
                        isRead: false,
                        check: "tour"
                    });
                    console.log(`Đã gửi thông báo trạng thái đơn hàng cho userId: ${userId}, trạng thái: ${task_status}`);
                } else {
                    console.log(`User ${userId} hiện không online.`);
                }
            } else {
                console.log(`Trạng thái đơn hàng ${task_status} không nằm trong danh sách cần thông báo.`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi thông báo trạng thái đơn hàng:", error.message);
        }
    });


    //xe

    // Xử lý khi đặt hàng thành công
    socket.on("orderSuccessCar", (orderData) => {
        console.log("cos thong bao", orderData);

        const user = onlineUser.find((user) => user.userId === orderData.orderNewCar.idUser);
        if (user) {
            console.log('Đang gửi thông báo cho người dùng:', user.socketId);
            io.to(user.socketId).emit("orderSuccessNotificationCar", {
                message: orderData.orderNewCar.idCar,
                orderId: orderData.orderNewCar._id,
                userId: orderData.orderNewCar.idUser,
                idCar: orderData.orderNewCar.idCar,
                status: orderData.orderNewCar.task_status,
                date: new Date(),
                isRead: false,
                check: "vehicle"
            });
        }
    });


    // kiểm tra trạng thái đơn hàng
    socket.on("orderCarStatusChanged", async (orderData) => {
        try {
            // const orderId = orderData?.orderStatus?._id;
            // const tourId = orderData?.orderStatus?.idTour;
            const userId = orderData?.orderCarStatus?.idUser;
            const task_status = orderData?.orderCarStatus?.task_status;
            console.log("Dữ liệu nhận được từ socket:", orderData);
            console.log("Trạng thái đơn hàng:", task_status);
            console.log("okok,", orderData?.orderCarStatus?.task_status, orderData?.orderCarStatus);


            const statusList = [
                "Hoàn tất",
                "Đặt xe thành công",
                "Đang diễn ra",
                "Đã hủy",
            ];

            if (statusList.includes(task_status)) {
                const user = onlineUser.find((user) => user.userId === orderData.orderCarStatus.idUser);

                if (user) {
                    io.to(user.socketId).emit("orderCarStatusNotification", {
                        orderId: orderData.orderCarStatus._id,
                        task_status,
                        idCar: orderData.orderCarStatus.idCar,
                        userId: orderData.orderCarStatus.idUser,
                        date: new Date(),
                        isRead: false,
                        check: "vehicle"
                    });
                    console.log(`Đã gửi thông báo trạng thái đơn xe cho userId: ${userId}, trạng thái: ${task_status}`);
                } else {
                    console.log(`User ${userId} hiện không online.`);
                }
            } else {
                console.log(`Trạng thái đơn xe ${task_status} không nằm trong danh sách cần thông báo.`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi thông báo trạng thái đơn xe:", error.message);
        }
    });


    // ngắt kết nối người dùng
    socket.on("disconnect", () => {
        // nó sẽ lọc mảng userOnline
        // nó sẽ trả về mảng mới ko có những tk user.socketId !== socket.id
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id)

        // gửi dữ liệu lên lại client
        io.emit("getOnineUsers", onlineUser)
    })

});

io.listen(4000)

// tk này chạy nodemon
