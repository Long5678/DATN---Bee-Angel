const asyncHandler = require('express-async-handler');
const LoaiXeModel = require('../Models/vehicleTypeModel');

const addLoaiXe = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const newLoaiXe = new LoaiXeModel({
        name,
        description
    });

    await newLoaiXe.save();
    res.status(201).json({ newLoaiXe });
});

const updateLoaiXe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const loaiXe = await LoaiXeModel.findById(id);

    if (!loaiXe) {
        return res.status(404).json({ message: 'Loại xe không tìm thấy.' });
    }

    loaiXe.name = name || loaiXe.name;
    loaiXe.description = description || loaiXe.description;

    const updatedLoaiXe = await loaiXe.save();
    res.status(200).json({ updatedLoaiXe });
});

const deleteLoaiXe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const loaiXe = await LoaiXeModel.findById(id);

    if (!loaiXe) {
        return res.status(404).json({ message: 'Loại xe không tìm thấy.' });
    }

    await loaiXe.deleteOne();
    res.status(200).json({ message: 'Loại xe đã xóa thành công.', loaiXe });
});

const getLoaiXes = asyncHandler(async (_req, res) => {
    const loaiXes = await LoaiXeModel.find().sort({ createdAt: -1 });
    res.status(200).json({ loaiXes });
});

module.exports = { addLoaiXe, updateLoaiXe, deleteLoaiXe, getLoaiXes };
