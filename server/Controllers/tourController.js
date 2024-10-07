const TourModel = require('../Models/tourModel');
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
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getDownloadURL, ref, uploadBytesResumable, deleteObject } = require('firebase/storage');
const firebaseConfig = require("../Configs/firebase.config");
const asyncHandler = require('express-async-handler');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addTour = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const {
        name,
        description,
        price,
        location,
        type,
        status,
        planes,
        dateTour,
    } = req.body;

    // Chuyển đổi chuỗi JSON thành mảng đối tượng
    const parsedPlanes = JSON.parse(planes); // Thêm dòng này
=======
    const { name, description, price, location, type, status } = req.body;
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd

    const downloadImageURLs = [];
    const downloadVideoURLs = [];
    const uploadImages = [];
    const uploadVideo = [];

    try {
        for (const file of req.files['images']) {
            const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
            const metadata = {
                contentType: file.mimetype
            };
=======
            const metadata = { contentType: file.mimetype };
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            // downloadImageURLs.push(downloadURL);
            uploadImages.push(file.originalname)
        }

        if (req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                // downloadVideoURLs.push(downloadURL);
                uploadVideo.push(file.originalname)
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
<<<<<<< HEAD

    const newTour = new TourModel({
        name,
        description,
        price,
        location,
        type,
        status,
        images: uploadImages,
        videos: uploadVideo,
        planes: parsedPlanes,
        dateTour,
    });

    await newTour.save();
    res.status(201).json(newTour);
});

const updateTour = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
=======
    
    const newTour = new TourModel({
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
        name,
        description,
        price,
        location,
        type,
        status,
        planes,
        dateTour,
    } = req.body;

    console.log("dateTour", dateTour);


    // Chuyển đổi chuỗi JSON thành mảng đối tượng
    const parsedPlanes = JSON.parse(planes); // Thêm dòng này
    // Nhận danh sách ảnh cũ từ body, để tí kiểm tra là mảng ảnh này với mảng ảnh trong mông
    const existingImages = JSON.parse(req.body.existingImages || '[]');

<<<<<<< HEAD
    const tour = await TourModel.findById(id);

    // Danh sách ảnh và video cũ từ tour hiện tại
    let updatedVideos = [tour.videos[0]];
    console.log("exten", existingImages);
    // cái existingImages là cái mảng chứa ảnh, lúc mà mình edit video thì nó hiện ra ảnh của video đó, ví dụ mình xóa ảnh đó thì nó sẽ còn lại 1 ảnh kia, 1 ảnh đó là ảnh cũ còn lại
=======
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
        return res.status(500).json({ message: error.message});
    }

    const updatedImages = [];
    const updatedVideos = [];
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd

    try {
        // Nếu có ảnh mới, tải lên và thêm vào danh sách ảnh
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                existingImages.push(file.originalname); // Thêm URL ảnh mới vào danh sách ảnh
                console.log("Đã up ảnh mới:", downloadURL);
            }
        }

        // Nếu có video mới, tải lên và thêm vào danh sách video
        if (req.files && req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
<<<<<<< HEAD
                const metadata = {
                    contentType: file.mimetype
                };
=======
                const metadata = { contentType: file.mimetype };
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
                updatedVideos = []; // tạo mảng mới để mất cái dữ liệu ban đầu đi
                updatedVideos.push(file.originalname); // Thêm URL video mới vào danh sách video
                console.log("Đã up video mới:", downloadURL);
            }
        }

        // Xóa ảnh và video chỉ khi không được sử dụng bởi tour khác
        if (req.files && req.files['images']) {
            for (const imageURL of tour.images) {
                console.log("logImage", imageURL);
                console.log("existingImages", existingImages);

                // Lọc các ảnh cũ mà người dùng muốn giữ lại
                const remainingOldImages = tour.images.filter(image => existingImages.includes(image));

                console.log("remainingOldImages:", remainingOldImages); // Log danh sách ảnh cũ được giữ lại

                // const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
                // const isImageUsedByOtherTours = await TourModel.exists({
                //     images: imageURL,
                //     _id: {
                //         $ne: id
                //     }
                // });

                // if (!isImageUsedByOtherTours) {
                //     console.log("Ảnh này không được dùng bởi tour nào khác, sẽ xóa:", imageFileName);
                //     const imageRef = ref(storages, `products/${imageFileName}`);
                //     await deleteObject(imageRef);
                // }
            }
        }

        // for (const videoURL of tour.videos) {
        //     const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
        //     const isVideoUsedByOtherTours = await TourModel.exists({
        //         videos: videoURL,
        //         _id: {
        //             $ne: id
        //         }
        //     });

        //     if (!isVideoUsedByOtherTours) {
        //         console.log("Video này không được dùng bởi tour nào khác, sẽ xóa:", videoFileName);
        //         const videoRef = ref(storages, `products/${videoFileName}`);
        //         await deleteObject(videoRef);
        //     }
        // }

    } catch (error) {
<<<<<<< HEAD
        return res.status(500).json({
            message: error.message
        });
=======
        return res.status(500).json({ message: error.message});
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
    }

    // Cập nhật tour với dữ liệu mới
    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.price = price || tour.price;
    tour.location = location || tour.location;
    tour.type = type || tour.type;
    tour.status = status || tour.status;
<<<<<<< HEAD
    tour.images = existingImages; // Cập nhật danh sách ảnh mới
    tour.videos = updatedVideos || tour.videos; // Cập nhật danh sách video mới
    tour.planes = parsedPlanes || tour.planes;
    tour.dateTour = dateTour || tour.dateTour;
=======
    tour.images = updatedImages; 
    tour.videos = updatedVideos;
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd


    // // Lưu tour đã cập nhật
    const updatedTour = await tour.save();
    res.status(200).json(updatedTour);
});


const deleteTour = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const {
        id
    } = req.params;
=======
    const { id } = req.params;
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
    const tour = await TourModel.findById(id);

    try {
        for (const [index, imageURL] of tour.images.entries()) {
            const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
            console.log(imageFileName);

            const isImageUsedByOtherTours = await TourModel.exists({
                images: imageURL,
                _id: {
                    $ne: id
                }
            });

            if (!isImageUsedByOtherTours) {
                console.log("ảnh này chưa có tour nào!");
                const imageRef = ref(storages, `products/${imageFileName}`);
                await deleteObject(imageRef);
            } else {
                console.log("ảnh này đã có tour");
            }
        }

        for (const videoURL of tour.videos) {
            const videoFileName = decodeURIComponent(videoURL.split('/').pop().split('?')[0]);
            const isVideoUsedByOtherTours = await TourModel.exists({
                videos: videoURL,
                _id: {
                    $ne: id
                }
            });

            if (!isVideoUsedByOtherTours) {
                console.log("video này chưa có tour nào!");
                const videoRef = ref(storages, `products/${videoFileName}`);
                await deleteObject(videoRef);
            } else {
                console.log("video này đã có tour");
            }
        }
    } catch (error) {
<<<<<<< HEAD
        return res.status(500).json({
            message: error.message
        });
=======
        return res.status(500).json({ message: error.message});
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
    }
    console.log("Xóa thành công");

<<<<<<< HEAD
    await TourModel.deleteOne({
        _id: id
    });
    res.status(200).json({
        tour
    });
=======
    await tour.deleteOne();
    res.status(200).json({tour});
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
});


const getAllTours = asyncHandler(async (req, res) => {
<<<<<<< HEAD
    const limit = parseInt(req.query.limit) || 3; // Mặc định lấy 3 tour nếu không có limit
    const tours = await TourModel.find().limit(limit);
    res.status(200).json(tours);
=======
    const tours = await TourModel.find();

        res.status(200).json(tours);
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
});

// Lấy thông tin chi tiết của một tour theo ID
const getTourById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tour = await TourModel.findById(id);

    res.status(200).json(tour);
});

<<<<<<< HEAD
// get all tour by id danh mục
const getAllTourByIdDM = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;

    const tour = await TourModel.find({
        type: id
    });
    res.status(200).json(tour);
})

// Tìm tour dựa vào tên hoặc ngày đi hoặc cả hai
const getTourByNameanDateTour = asyncHandler(async (req, res) => {
    const {
        name,
        dateTour
    } = req.query; // Lấy tham số từ query

    console.log(name, dateTour);
    

    // Tạo điều kiện tìm kiếm động
    let searchCriteria = {};

    // Nếu có tên, thêm vào điều kiện tìm kiếm
    if (name) {
        searchCriteria.name = {
            $regex: new RegExp(name, "i")
        }; // Tìm kiếm không phân biệt hoa/thường
    }

    // Nếu có ngày đi, thêm vào điều kiện tìm kiếm
    if (dateTour) {
        searchCriteria.dateTour = dateTour; // Tìm kiếm chính xác ngày đi
    }

    try {
        // Tìm tour theo điều kiện tìm kiếm
        const tours = await TourModel.find(searchCriteria);

        if (tours.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy tour nào."
            });
        }

        // Trả về danh sách tour tìm thấy
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi tìm kiếm tour.",
            error: error.message
        });
    }
});


module.exports = {
    addTour,
    updateTour,
    deleteTour,
    getAllTours,
    getTourById,
    getAllTourByIdDM,
    getTourByNameanDateTour
}
=======
module.exports = { addTour, updateTour, deleteTour, getAllTours, getTourById }
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
