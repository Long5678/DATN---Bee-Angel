const asyncHandler = require('express-async-handler');
const TourTypeModel = require('../Models/tourTypeModel');

const addTourType = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const {
        name,
        description
    } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Vui lòng nhập đầy đủ thông tin !'
        })
    }

    const existingType = await TourTypeModel.findOne({
        name
    });
    if (existingType) {
        return res.status(400).json({
            message: 'Loại tour này đã tồn tại.'
        });
=======
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin !' })
    }

    const existingType = await TourTypeModel.findOne({ name });
    if (existingType) {
        return res.status(400).json({ message: 'Loại tour này đã tồn tại.' });
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85
    }

    const newTourType = new TourTypeModel({
        name,
        description
    });

    await newTourType.save();
<<<<<<< HEAD
    res.status(201).json({
        message: 'Thêm loại tour thành công.',
        data: newTourType
    });
});

const updateTourType = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;
    const {
        description
    } = req.body;
    const tourType = await TourTypeModel.findById(id);

    if (!tourType) {
        return res.status(404).json({
            message: 'Không tìm thấy loại tour này.'
        });
=======
    res.status(201).json({ message: 'Thêm loại tour thành công.', data: newTourType });
});

const updateTourType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { description } = req.body;
    const tourType = await TourTypeModel.findById(id);

    if (!tourType) {
        return res.status(404).json({ message: 'Không tìm thấy loại tour này.' });
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85
    }

    tourType.name = name || tourType.name;
    tourType.description = description || tourType.description;

    const updatedTourType = await tourType.save();
<<<<<<< HEAD
    res.status(200).json({
        message: 'Cập nhật loại tour thành công.',
        data: updatedTourType
    });
});

const deleteTourType = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const tourType = await TourTypeModel.findByIdAndDelete(id);
    if (!tourType) {
        return res.status(404).json({
            message: 'Không tìm thấy loại tour này.'
        });
    }
    res.status(200).json({
        message: "Xóa thành công"
    });
=======
    res.status(200).json({ message: 'Cập nhật loại tour thành công.', data: updatedTourType });
});

const deleteTourType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tourType = await TourTypeModel.findById(id);
    
    if (!tourType) {
        return res.status(404).json({ message: 'Không tìm thấy loại tour này.' });
    }

    await tourType.deleteOne();
    res.status(200).json({ message: 'Xóa loại tour thành công.' });
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85
});

// Lấy tất cả các loại tour
const getTourTypes = asyncHandler(async (_req, res) => {
<<<<<<< HEAD
    const tourTypes = await TourTypeModel.find().sort({
        createdAt: -1
    });
    res.status(200).json(tourTypes);
});


// lấy 1 tour dựa vào id
const getOneTourType = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const tourType = await TourTypeModel.findById(id);
    if (!tourType) {
        return res.status(404).json({
            message: 'Không tìm thấy loại tour này.'
        });
    }

     res.status(200).json(tourType);
})

module.exports = {
    addTourType,
    updateTourType,
    deleteTourType,
    getTourTypes,
    getOneTourType
};
=======
    const tourTypes = await TourTypeModel.find().sort({ createdAt: -1 });
    res.status(200).json(tourTypes);
});

module.exports = { addTourType, updateTourType, deleteTourType, getTourTypes };
>>>>>>> 996d7cf62830389f14fbcbebcab8c6d7ed30db85
