const asyncHandler = require('express-async-handler');
const TourTypeModel = require('../Models/tourTypeModel');

const addTourType = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const newTourType = new TourTypeModel({
        name,
        description
    });

    await newTourType.save();
    res.status(201).json(newTourType);
});

const updateTourType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { description } = req.body;
    const tourType = await TourTypeModel.findById(id);

    tourType.name = name || tourType.name;
    tourType.description = description || tourType.description;

    const updatedTourType = await tourType.save();
    res.status(200).json(updatedTourType);
});

const deleteTourType = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tourType = await TourTypeModel.findById(id);

    await tourType.deleteOne();
    res.status(200).json(tourType);
});

// Lấy tất cả các loại tour
const getTourTypes = asyncHandler(async (_req, res) => {
    const tourTypes = await TourTypeModel.find().sort({ createdAt: -1 });
    res.status(200).json(tourTypes);
});

module.exports = { addTourType, updateTourType, deleteTourType, getTourTypes };
