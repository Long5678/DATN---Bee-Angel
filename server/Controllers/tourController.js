const TourModel = require('../Models/tourModel');
const asyncHandler = require('express-async-handler');

const addTour = asyncHandler(async (req, res) => {
    const { name, description, price, location, type, status } = req.body;

    if (!name || !description || !price || !location || !type || !status) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    if (!req.files || !req.files['images'] || req.files['images'].length === 0) {
        return res.status(400).json({ message: 'Vui lòng tải lên ít nhất một hình ảnh.' });
    }

    const validStatuses = ['Còn tour', 'Sắp hết', 'Hết tour'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }

    const checkimages = req.files['images'].map(file => file.filename);
    const checkvideos = req.files['videos'] ? req.files['videos'].map(file => file.filename) : [];

    const newTour = new TourModel({
        name,
        description,
        price,
        location,
        type,
        status,
        images: checkimages,
        videos: checkvideos
    });

    await newTour.save();
    res.status(201).json({ message: 'Tour đã được thêm thành công.', data: newTour });
});


const updateTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, location, type, status } = req.body;
    const tour = await TourModel.findById(id);
    if (!tour) {
        return res.status(404).json({ message: 'Không tìm thấy tour này.' });
    }
    const validStatuses = ['Còn tour', 'Sắp hết', 'Hết tour'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }

    const updatedImages = req.files && req.files['images'] ? req.files['images'].map(file => file.filename) : tour.images;
    const updatedVideos = req.files && req.files['videos'] ? req.files['videos'].map(file => file.filename) : tour.videos;

    if (!req.files || !req.files['images'] || req.files['images'].length === 0) {
        return res.status(400).json({ message: 'Vui lòng tải lên ít nhất một hình ảnh.' });
    }

    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.price = price || tour.price;
    tour.location = location || tour.location;
    tour.type = type || tour.type;
    tour.status = status || tour.status;
    tour.images = updatedImages; 
    tour.videos = updatedVideos;

    const updatedTour = await tour.save();
    res.status(200).json({ message: 'Cập nhật tour thành công.', data: updatedTour });
});


const deleteTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);
    if (!tour) {
        return res.status(404).json({ message: 'Không tìm thấy tour này.' });
    }
    await tour.deleteOne();
    res.status(200).json({ message: 'Xóa tour thành công.' });
});

const getAllTours = asyncHandler(async (req, res) => {
    const tours = await TourModel.find();
    
    if (tours) {
        res.status(200).json({ 
            message: 'Lấy danh sách tour thành công', 
            data: tours 
        });
    } else {
        res.status(404).json({ message: 'Không tìm thấy tour nào.' });
    }
});

// Lấy thông tin chi tiết của một tour theo ID
const getTourById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);

    if (!tour) {
        return res.status(404).json({ message: 'Không tìm thấy tour này.' });
    }

    res.status(200).json({ message: 'Lấy thông tin tour thành công.', data: tour });
});

module.exports = { addTour, updateTour, deleteTour, getAllTours, getTourById }
