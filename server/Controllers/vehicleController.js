const VehicleModel = require('../Models/vehicleModel');
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getDownloadURL, ref, uploadBytesResumable, deleteObject } = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addVehicle = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;

    const imgURLs = [];

    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `vehicles/${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                imgURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    const newVehicle = new VehicleModel({
        name,
        description,
        price,
        images: imgURLs
    });

    await newVehicle.save();
    res.status(201).json({ newVehicle });
});

const updateVehicle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const vehicle = await VehicleModel.findById(id);

    try {
        for (const imageURL of vehicle.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    const updatedImgURLs = [];

    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `vehicles/${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedImgURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    vehicle.name = name || vehicle.name;
    vehicle.description = description || vehicle.description;
    vehicle.price = price || vehicle.price;
    vehicle.images = updatedImgURLs.length ? updatedImgURLs : vehicle.images;

    const updatedVehicle = await vehicle.save();
    res.status(200).json({ updatedVehicle });
});

const deleteVehicle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vehicle = await VehicleModel.findById(id);

    try {
        for (const imageURL of vehicle.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    await vehicle.deleteOne();
    res.status(200).json({ vehicle });
});

const getAllVehicles = asyncHandler(async (req, res) => {
    const vehicles = await VehicleModel.find();
    res.status(200).json({ vehicles });
});

const getVehicleById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vehicle = await VehicleModel.findById(id);
    res.status(200).json({ vehicle });
});

module.exports = { addVehicle, updateVehicle, deleteVehicle, getAllVehicles, getVehicleById };
