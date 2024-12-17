const asyncHandler = require('express-async-handler');
const LoaiXeModel = require('../Models/vehicleTypeModel');
const VehicleModel = require('../Models/vehicleModel')

const addLoaiXe = asyncHandler(async (req, res) => {
    const {
        name,
        description
    } = req.body;

    const existingType = await LoaiXeModel.findOne({
        name
    });
    if (existingType) {
        return res.status(400).json({
            message: 'Loại xe này đã tồn tại.'
        });
    }

    const newLoaiXe = new LoaiXeModel({
        name,
        description
    });

    await newLoaiXe.save();
    res.status(201).json(newLoaiXe);
});

const updateLoaiXe = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        description
    } = req.body;

    const loaiXe = await LoaiXeModel.findById(id);

    if (!loaiXe) {
        return res.status(404).json({
            message: 'Loại xe không tìm thấy.'
        });
    }

    loaiXe.name = name || loaiXe.name;
    loaiXe.description = description || loaiXe.description;

    const updatedLoaiXe = await loaiXe.save();
    res.status(200).json(updatedLoaiXe);
});

const deleteLoaiXe = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    console.log(id);
    const checkTypeVehicle = await VehicleModel.find({
        type: id
    });

    if (checkTypeVehicle.length === 0) {
        const vehicleType = await LoaiXeModel.findOneAndDelete({
            _id: id
        }); // Updated to search using _id
        if (!vehicleType) {
            return res.status(404).json({
                message: 'Loại xe không tìm thấy.'
            });
        }
        res.status(200).json(vehicleType);
    } else {
        res.status(400).json({
            message: 'Không thể xóa danh mục này vì xe của danh mục vẫn còn'
        });
    }
});


const getLoaiXesById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const vehicleType = await LoaiXeModel.findById(id);
    res.status(200).json(vehicleType);
});
const getLoaiXes = asyncHandler(async (_req, res) => {
    const loaiXes = await LoaiXeModel.find();
    res.status(200).json(loaiXes);
});

module.exports = {
    addLoaiXe,
    updateLoaiXe,
    deleteLoaiXe,
    getLoaiXes,
    getLoaiXesById
};
