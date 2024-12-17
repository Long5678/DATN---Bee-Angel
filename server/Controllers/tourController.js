const TourModel = require('../Models/tourModel');
const cron = require('node-cron');
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
const tourModel = require('../Models/tourModel');

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);

const addTour = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        type,
        status,
        planes,
        dateTour,
        numDay,
        price_Adult,
        price_Children,
    } = req.body;

    // Chuyển đổi chuỗi JSON thành mảng đối tượng
    const parsedPlanes = JSON.parse(planes); // Thêm dòng này
    const parsedDateTour = JSON.parse(dateTour); // Chuyển dateTour từ chuỗi JSON thành mảng đối tượng

    const uploadImages = [];
    const uploadVideo = [];

    try {
        for (const file of req.files['images']) {
            const storageRef = ref(storages, `products/${file.originalname}`);
            // tham chiếu đến vị trí tải tệp
            const metadata = {
                contentType: file.mimetype
            };
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            // đoạn này truyền ba tham số là nơi tham chiếu, nội dung tệp , và thông tin đi kèm để tải ảnh lên firebase
            const downloadURL = await getDownloadURL(snapshot.ref);
            // downloadImageURLs.push(downloadURL);
            uploadImages.push(file.originalname)
        }

        if (req.files['videos']) {
            for (const file of req.files['videos']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
                const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
                // const downloadURL = await getDownloadURL(snapshot.ref);
                // downloadVideoURLs.push(downloadURL);
                uploadVideo.push(file.originalname)
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const newTour = new TourModel({
        name,
        description,
        price,
        type,
        status,
        images: uploadImages,
        videos: uploadVideo,
        planes: parsedPlanes,
        dateTour: parsedDateTour,
        numDay,
        price_Adult,
        price_Children,
        isDeleted: false,
    });

    await newTour.save();
    res.status(201).json(newTour);
});

const updateTour = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        description,
        price,
        type,
        status,
        planes,
        dateTour,
        numDay,
        price_Adult,
        price_Children,
    } = req.body;

    console.log("dateTour", dateTour);


    // Chuyển đổi chuỗi JSON thành mảng đối tượng
    const parsedPlanes = JSON.parse(planes); // Thêm dòng này
    const parsedDateTour = JSON.parse(dateTour); // Chuyển dateTour từ chuỗi JSON thành mảng đối tượng
    console.log("parsedDateTour", parsedDateTour);

    // Nhận danh sách ảnh cũ từ body, để tí kiểm tra là mảng ảnh này với mảng ảnh trong mông
    const existingImages = JSON.parse(req.body.existingImages || '[]');

    const tour = await TourModel.findById(id);

    // Danh sách ảnh và video cũ từ tour hiện tại
    let updatedVideos = [tour.videos[0]];
    // console.log("exten", existingImages);
    // cái existingImages là cái mảng chứa ảnh, lúc mà mình edit video thì nó hiện ra ảnh của video đó, ví dụ mình xóa ảnh đó thì nó sẽ còn lại 1 ảnh kia, 1 ảnh đó là ảnh cũ còn lại

    try {
        // Nếu có ảnh mới, tải lên và thêm vào danh sách ảnh
        if (req.files && req.files['images']) {
            for (const file of req.files['images']) {
                const storageRef = ref(storages, `products/${file.originalname}`);
                const metadata = {
                    contentType: file.mimetype
                };
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
                const metadata = {
                    contentType: file.mimetype
                };
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

                const imageFileName = decodeURIComponent(imageURL.split('/').pop().split('?')[0]);
                const isImageUsedByOtherTours = await TourModel.exists({
                    images: imageURL,
                    _id: {
                        $ne: id
                    }
                });

                if (!isImageUsedByOtherTours) {
                    console.log("Ảnh này không được dùng bởi tour nào khác, sẽ xóa:", imageFileName);
                    const imageRef = ref(storages, `products/${imageFileName}`);
                    await deleteObject(imageRef);
                }
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
        return res.status(500).json({
            message: error.message
        });
    }

    console.log("ok1", existingImages);

    // // Cập nhật tour với dữ liệu mới
    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.price = price || tour.price;
    tour.type = type || tour.type;
    tour.status = status || tour.status;
    tour.images = existingImages; // Cập nhật danh sách ảnh mới
    tour.videos = updatedVideos || tour.videos; // Cập nhật danh sách video mới
    tour.planes = parsedPlanes || tour.planes;
    tour.dateTour = parsedDateTour || tour.dateTour;
    tour.numDay = numDay || tour.numDay;
    tour.price_Adult = price_Adult || tour.price_Adult;
    tour.price_Children = price_Children || tour.price_Children;
    tour.isDeleted = tour.isDeleted;

    // // // Lưu tour đã cập nhật
    const updatedTour = await tour.save();
    res.status(200).json(updatedTour);
});


const deleteTour = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
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
        return res.status(500).json({
            message: error.message
        });
    }
    console.log("Xóa thành công");

    await TourModel.deleteOne({
        _id: id
    });
    res.status(200).json({
        tour
    });
});


const getAllTours = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 3; // Mặc định lấy 3 tour nếu không có limit
    // const tours = await TourModel.find().limit(limit);
     const tours = await TourModel.find({
         isDeleted: false
     }).limit(limit);
    res.status(200).json(tours);
});

const getAllToursAdmin = asyncHandler(async (req, res) => {
    const tours = await TourModel.find()
    res.status(200).json(tours);
});

// Lấy thông tin chi tiết của một tour theo ID
const getTourById = asyncHandler(async (req, res) => {
    const {
        id
    } = req.params;
    const tour = await TourModel.findById(id);

    res.status(200).json(tour);
});

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

// Tìm tour dựa vào tên, ngày đi hoặc số ngày tour
const getTourByNameanDateTour = asyncHandler(async (req, res) => {
    const {
        name,
        dateTour,
        numDay
    } = req.query; // Lấy tham số từ query

    // console.log(name, dateTour);
    console.log(numDay);


    // Tạo điều kiện tìm kiếm động
    let searchCriteria = {};

    // Nếu có tên, thêm vào điều kiện tìm kiếm
    if (name) {
        searchCriteria.name = {
            $regex: new RegExp(name, "i")
        }; // Tìm kiếm không phân biệt hoa/thường
    }

    // Nếu có ngày đi, thêm vào điều kiện tìm kiếm
    if (dateTour && dateTour !== '/undefined/undefined') {
        searchCriteria.dateTour = {
            $elemMatch: {
                departureDate: dateTour
            }
        }; // Tìm kiếm trong phần tử có departureDate
    }

    // Nếu có số ngày, thêm vào điều kiện tìm kiếm
    if (numDay) {
        searchCriteria.numDay = parseInt(numDay); // Chuyển thành số để so khớp với dữ liệu
    }

    try {
        // console.log("searchCriteria", searchCriteria);

        // Tìm tour theo điều kiện tìm kiếm
        const tours = await TourModel.find(searchCriteria);
        console.log("tour ", tours);


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



// hàm này sẽ cập nhật lại ngày khởi hnahf của tour
// ví dụ ngày hôm nay thì những ngày hôm trước sẽ mất đi
const updateDateTour = async (req = null, res = null) => {
    try {
        // Lấy tất cả các tour từ database
        const tours = await tourModel.find();

        const today = new Date(); // Ngày hiện tại

        for (let tour of tours) {
            // Lọc lại danh sách dateTour để giữ lại các ngày khởi hành trong tương lai
            const updatedDateTour = tour.dateTour.filter(date => {
                const [day, month, year] = date.departureDate.split('/'); // Chuyển chuỗi thành ngày tháng năm
                const departureDate = new Date(`${year}-${month}-${day}`); // Tạo đối tượng Date từ chuỗi

                return departureDate >= today; // Chỉ giữ lại ngày khởi hành trong tương lai
            });

            // Cập nhật lại dateTour nếu có thay đổi
            if (updatedDateTour.length !== tour.dateTour.length) {
                tour.dateTour = updatedDateTour;
                await tour.save(); // Lưu lại tour với danh sách dateTour đã được cập nhật
            }
        }

        console.log("Cập nhật ngày khởi hành thành công!");

    } catch (error) {
        console.log("Error update dateTour:", error);
    }
};

// Chạy cron job mỗi 10 giây
cron.schedule('0 0 * * *', () => {
    console.log("Đang cập nhật ngày khởi hành các tour...");
    updateDateTour();
});




// hàm này sẽ tự động cập nhập khi có người đặt tour 
const updateBookingsCount = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const updatedTour = await tourModel.findByIdAndUpdate(
            id, {
                $inc: {
                    bookingsCount: 1
                }
            }, // Tăng số người đặt
            {
                new: true
            } // Trả về tour sau khi cập nhật
        );

        if (!updatedTour) {
            return res.status(404).json({
                message: 'Tour không tồn tại!'
            });
        }

        res.status(200).json({
            message: 'Cập nhật người dùng thành công!',
            updatedTour
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi server!',
            error
        });
    }
};
// hàm này lấy ra tour dựa trên booking tour
const getTopTour = async (req, res) => {
    try {
        // Số lượng top tour muốn lấy, có thể truyền qua query hoặc mặc định là 3
        const limit = parseInt(req.query.limit) || 3;

        // Lấy danh sách tour sắp xếp theo bookingCount giảm dần
        const topTours = await tourModel.find().sort({
            bookingsCount: -1
        }).limit(limit);

        res.status(200).json({
            success: true,
            data: topTours,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch top tours",
            error: error.message,
        });
    }
}


// cập nhật trạn thái tour đó dừng hoạt động hay đang hoạt động
const updateIsDeleteTour = async (req, res) => {
    const {
        id
    } = req.params

    try {
        const tour = await TourModel.findById(id)
        tour.isDeleted = !tour.isDeleted
        await tour.save();
        res.status(200).json(tour)
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}



module.exports = {
    addTour,
    updateTour,
    deleteTour,
    getAllTours,
    getTourById,
    getAllTourByIdDM,
    getTourByNameanDateTour,
    updateBookingsCount,
    getTopTour,
    updateIsDeleteTour,
    getAllToursAdmin
}