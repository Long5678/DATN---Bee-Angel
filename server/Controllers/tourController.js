const TourModel = require('../Models/tourModel');
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getDownloadURL, ref, uploadBytesResumable, deleteObject } = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addTour = asyncHandler(async (req, res) => {
    const { name, description, price, location, type, status } = req.body;

    const downloadImageURLs = [];
    const downloadVideoURLs = [];

    try {
        for (const file of req.files['images']) {
            const storageRef = ref(storages, `products/${file.originalname}`);
            const metadata = { contentType: file.mimetype };
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            downloadImageURLs.push(downloadURL);
        }

        if (req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                downloadVideoURLs.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
    
    const newTour = new TourModel({
        name,
        description,
        price,
        location,
        type,
        status,
        images: downloadImageURLs,
        videos: downloadVideoURLs
    });

    await newTour.save();
    res.status(201).json(newTour);
});

const updateTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, location, type, status } = req.body;
    const tour = await TourModel.findById(id);

    try {
        for (const imageURL of tour.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }

        for (const videoURL of tour.videos) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const videoRef = ref(storages, videoFileName);
            await deleteObject(videoRef);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const updatedImages = [];
    const updatedVideos = [];

    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedImages.push(downloadURL);
            }
        }

        if (req.files && req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
                const metadata = { contentType: file.mimetype };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedVideos.push(downloadURL);
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
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
    res.status(200).json(updatedTour);
});


const deleteTour = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);

    try {
        for (const imageURL of tour.images) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            const imageRef = ref(storages, imageFileName);
            await deleteObject(imageRef);
        }

        for (const videoURL of tour.videos) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const videoRef = ref(storages, videoFileName);
            await deleteObject(videoRef);
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    await tour.deleteOne();
    res.status(200).json(tour);
});


const getAllTours = asyncHandler(async (req, res) => {
    const tours = await TourModel.find();

        res.status(200).json(tours);
});

// Lấy thông tin chi tiết của một tour theo ID
const getTourById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);

    res.status(200).json(tour);
});

module.exports = { addTour, updateTour, deleteTour, getAllTours, getTourById }
