const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./Routes/userRoute");
const tourRoutes = require('./Routes/tourRoute');
const tourTypeRoutes = require('./Routes/tourTypeRoutes');
const chatRoutes = require('./Routes/chatRoute')
const messageRoutes = require('./Routes/messageRoute')
const CommentRoutes = require('./Routes/commentRoute');
const blogRoutes = require('./Routes/blogRoute')
const priceRoutes = require('./Routes/priceRoutes')
const orderRoutes = require('./Routes/orderRoute')
const ratingRoutes = require("./Routes/ratingRoute")
const bodyParser = require('body-parser');
const vehicleTypeRoutes = require('./Routes/vehicleTypeRoutes')
const vehicleRoute = require('./Routes/vehicleRoute')
const orderVehicleRoute = require('./Routes/orderVehicleRoute')
const priceVehicleRoutes = require('./Routes/priceVehicleRoute')
const notifiChatRoutes = require('./Routes/notifiChatRoute')
const notificationRoutes = require("./Routes/notificationRoute")
const reportRoutes = require("./Routes/reportRoute")
const ratingVehicleRoutes = require("./Routes/ratingVehicleRoute")
const notificationVehicleRoutes = require("./Routes/notificationVehicleRoute")

const app = express();
require("dotenv").config()

app.use(bodyParser.json({
    limit: '10mb'
})); // Cho phép tối đa 10MB
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: true
// }))
// app.use(express.json());

app.use(cors());

// Cung cấp các tệp tĩnh từ thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// các router
app.use("/auth", userRoute)
app.use('/Admin/tours', tourRoutes);
app.use('/Admin/tourTypes', tourTypeRoutes);
app.use('/Comment', CommentRoutes)
app.use("/chats", chatRoutes)
app.use("/messages", messageRoutes)
app.use('/Admin/blog', blogRoutes);
app.use('/price', priceRoutes);
app.use('/Order', orderRoutes);
app.use('/Rating', ratingRoutes);
app.use('/Admin/vehicleType', vehicleTypeRoutes);
app.use('/Admin/vehicle', vehicleRoute);
app.use('/orderCar', orderVehicleRoute);
app.use('/vehicle-price', priceVehicleRoutes)
app.use('/notifiChat', notifiChatRoutes)
app.use("/notification", notificationRoutes)
app.use("/reportRoutes", reportRoutes)
app.use("/notification-vehicle", notificationVehicleRoutes)
app.use('/ratingVehicle', ratingVehicleRoutes);

app.get("/", (req, res) => {
    res.send("welcom your zalo chat")
})

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;


app.listen(port, (req, res) => {
    console.log(`Server running on port. ${port}`);
})

mongoose.connect(uri).then(async () => {
    console.log("MongoDB connection astablished")
})