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

const app = express();
require("dotenv").config()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

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