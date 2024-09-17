// controllers/tourController.js
const TourModel = require('../Models/tourModel');
const asyncHandler = require('express-async-handler');

const addTour = asyncHandler(async (req, res) => {
    const { name, description, price, location, date, status, images, videos } = req.body;

    // Kiểm tra xem các trường bắt buộc có đầy đủ không
    if (!name || !description || !price || !location || !date || !status || !images || !videos) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin và tải lên ít nhất một hình ảnh.' });
    }

        // Kiểm tra giá trị status
        const validStatuses = ['Còn tour', 'Sắp hết', 'Hết tour'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
        }

    // Tạo mới một đối tượng Tour
    const newTour = new TourModel({
        name,
        description,
        price,
        location,
        date,
        status,
        images,  // Lưu URL hình ảnh
        videos   // Lưu URL video (không bắt buộc)
    });

    // Lưu tour vào cơ sở dữ liệu
    await newTour.save();
    res.status(201).json({ message: 'Tour đã được thêm thành công.', data: newTour });
});


const updateTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, location, date, status, images, videos } = req.body;

    // Tìm tour theo ID
    const tour = await TourModel.findById(id);

    // Nếu tour không tồn tại
    if (!tour) {
        return res.status(404).json({ message: 'Không tìm thấy tour này.' });
    }

    // Kiểm tra giá trị status
    const validStatuses = ['Còn tour', 'Sắp hết', 'Hết tour'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }

    // Cập nhật các trường
    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.price = price || tour.price;
    tour.location = location || tour.location;
    tour.date = date || tour.date;
    tour.status = status || tour.status;
    tour.images = images || tour.images;   // Cập nhật URL hình ảnh
    tour.videos = videos || tour.videos;   // Cập nhật URL video

    // Lưu các thay đổi vào cơ sở dữ liệu
    const updatedTour = await tour.save();
    res.status(200).json({ message: 'Cập nhật tour thành công.', data: updatedTour });
});

const deleteTour = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Xóa tour dựa trên ID
    const result = await TourModel.deleteOne({ _id: id });

    // Nếu không tìm thấy tour
    if (!result) {
        return res.status(404).json({ message: 'Không tìm thấy tour này.' });
    }

    res.status(200).json({ message: 'Xóa tour thành công.' });
});



module.exports = {
    addTour,
    updateTour,
    deleteTour
}
