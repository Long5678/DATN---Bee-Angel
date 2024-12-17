const VehicleModel = require('../Models/vehicleModel');
const {
    initializeApp
} = require("firebase/app");
const {
    getStorage
} = require("firebase/storage");
const {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject
} = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addVehicle = asyncHandler(async (req, res) => {
    const {
        name,
        motorcycleBrand,
        licensePlate,
        description,
        price,
        type
    } = req.body;
    const parsedLicensePlate = JSON.parse(licensePlate);

    console.log('po', parsedLicensePlate);


    // const imgURLs = [];
    const uploadImages = [];

    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `vehicles/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                uploadImages.push(file.originalname);
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    const newVehicle = new VehicleModel({
        name,
        motorcycleBrand,
        licensePlate: parsedLicensePlate,
        description,
        price,
        images: uploadImages,
        type
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
});


const updateVehicle = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        motorcycleBrand,
        licensePlate,
        description,
        price,
        type
    } = req.body;

    const parsedLicensePlate = JSON.parse(licensePlate);

    const vehicle = await VehicleModel.findById(id);

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle not found"
        });
    }

    // Kiểm tra nếu không có file nào được upload
    if (!req.files || !req.files['images']) {
        return res.status(400).json({
            message: "No images uploaded"
        });
    }


    const existingImages = JSON.parse(req.body.existingImages || '[]');


    try {
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `vehicles/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                existingImages.push(file.originalname);
                console.log("Đã up ảnh mới:", downloadURL);
            }


        }


        if (req.files && req.files['images']) {
            for (const imageURL of vehicle.images) {
                console.log("logImage", imageURL);
                console.log("existingImages", existingImages);

                // Lọc các ảnh cũ mà người dùng muốn giữ lại
                const remainingOldImages = vehicle.images.filter(image => existingImages.includes(image));

                console.log("remainingOldImages:", remainingOldImages); // Log danh sách ảnh cũ được giữ lại

                const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
                const isImageUsedByOtherVehicles = await VehicleModel.exists({
                    images: imageURL,
                    _id: {
                        $ne: id
                    }
                });

                if (!isImageUsedByOtherVehicles) {
                    console.log("Ảnh này không được dùng bởi xe nào khác, sẽ xóa:", imageFileName);
                    const imageRef = ref(storages, `vehicles/${imageFileName}`);
                    await deleteObject(imageRef);
                }
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    vehicle.name = name || vehicle.name;
    vehicle.motorcycleBrand = motorcycleBrand || vehicle.motorcycleBrand;
    vehicle.type = type || vehicle.type;
    vehicle.description = description || vehicle.description;
    vehicle.licensePlate = parsedLicensePlate || vehicle.licensePlate;
    vehicle.price = price || vehicle.price;
    vehicle.images = existingImages.length ? existingImages : vehicle.images;
    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
});




const deleteVehicle = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const vehicle = await VehicleModel.findById(id);

    try {
        for (const [index, imageURL] of vehicle.images.entries()) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            console.log(imageFileName);

            const isImageUsedByOtherCars = await VehicleModel.exists({
                images: imageURL,
                _id: {
                    $ne: id
                }
            });

            if (!isImageUsedByOtherCars) {
                console.log("ảnh này chưa có xe nào!");
                const imageRef = ref(storages, `vehicles/${imageFileName}`);
                await deleteObject(imageRef);
            } else {
                console.log("ảnh này đã có xe");
            }
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
    console.log("Xóa thành công");

    await VehicleModel.deleteOne({
        _id: id
    });
    res.status(200).json({
        vehicle
    });
});

const getAllVehicles = asyncHandler(async (req, res) => {
    const vehicles = await VehicleModel.find();
    res.status(200).json(vehicles);
});

const getVehicleById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const vehicle = await VehicleModel.findById(id);

        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle not found'
            });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});




module.exports = {
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getAllVehicles,
    getVehicleById
};
