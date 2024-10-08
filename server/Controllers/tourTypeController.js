const asyncHandler = require('express-async-handler');
const TourTypeModel = require('../Models/tourTypeModel');
const tourModel = require('../Models/tourModel');

const addTourType = asyncHandler(async (req, res) => {
    const {
        name,
        description
    } = req.body;

    const existingType = await TourTypeModel.findOne({
        name
    });
    if (existingType) {
        return res.status(400).json({
            message: 'Loại tour này đã tồn tại.'
        });
    }

    const newTourType = new TourTypeModel({
        name,
        description
    });

    await newTourType.save();
    res.status(201).json(newTourType);
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

    tourType.name = name || tourType.name;
    tourType.description = description || tourType.description;

    const updatedTourType = await tourType.save();
    res.status(200).json(updatedTourType);
});

const deleteTourType = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const checkTypeTour = await tourModel.find({
        type: id
    })
       if (checkTypeTour.length === 0) {
          const tourType = await TourTypeModel.findOneAndDelete(id);
          res.status(200).json(tourType);
       } else {
           res.status(400).json({
               message: 'Không thể xóa danh mục này vì tour của danh mục vẫn còn'
           })

       }
});

// Lấy tất cả các loại tour
const getTourTypes = asyncHandler(async (_req, res) => {
    const tourTypes = await TourTypeModel.find().sort({
        createdAt: -1
    });
    res.status(200).json(tourTypes);
});


const getTourTypeById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const tourType = await TourTypeModel.findById(id);
    res.status(200).json(tourType);
});

module.exports = {
    addTourType,
    updateTourType,
    deleteTourType,
    getTourTypes,
    getTourTypeById
};