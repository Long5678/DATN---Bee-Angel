const RatingVehicle = require('../Models/ratingVehicleModel')
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

const app = initializeApp(firebaseConfig);
const storages = getStorage(app);
const employeeUserId = '672dc2da1818d57e0dfcf283';

const createRatingVehicle = async (req, res) => {
  try {
      const {
          userId,
          idCar,
          rating,
          review
      } = req.body;

      // Kiểm tra nếu người dùng đã đánh giá sản phẩm này
      const existingRating = await RatingVehicle.findOne({
          userId,
          idCar
      });
      if (existingRating) {
          return res.status(400).json({
              message: 'Bạn đã đánh giá sản phẩm này rồi!'
          });
      }

      // Mảng lưu trữ URL của ảnh
      const downloadImageUrl = [];

      // Tải từng file lên Firebase Storage và lưu URL
      if (req.files && req.files['imageUrls']) {
          for (const file of req.files['imageUrls']) {
              const storageRef = ref(storages, `ratingVehicles/${file.originalname}`);
              const metadata = {
                  contentType: file.mimetype
              };
              const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
              const downloadURL = await getDownloadURL(snapshot.ref);
              if (downloadURL) {
                  console.log('Download URL:', downloadURL);
                  downloadImageUrl.push(downloadURL);
              } else {
                  console.log('Failed to get download URL for:', file.originalname);
              }

          }
      }

      // Tạo đánh giá mới với hình ảnh
      const newRating = new RatingVehicle({
          rating,
          review,
          userId,
          idCar,
          imageUrls: downloadImageUrl // Thêm URL ảnh vào đánh giá
      });

      // Phản hồi tự động nếu rating từ 4 sao trở lên
      const autoReply = {
          reply: rating >= 4 ?
              'Cảm ơn bạn đã đánh giá tích cực! Chúng tôi rất vui vì dịch vụ của chúng tôi đáp ứng được mong đợi của bạn.' : 'Cảm ơn phản hồi của bạn. Chúng tôi rất tiếc vì dịch vụ của chúng tôi chưa đáp ứng được kỳ vọng của bạn.',
          userId: employeeUserId, // ID của tài khoản quản trị viên
      };

      newRating.replies.push(autoReply);

      // Lưu đánh giá mới
      await newRating.save();

      res.status(201).json({
          message: 'Đánh giá đã được tạo thành công!',
          rating: newRating
      });
  } catch (error) {
      res.status(500).json({
          message: 'Đã xảy ra lỗi!',
          error
      });
  }
};


// Lấy danh sách đánh giá
const getRatingByVehicle = async (req, res) => {
  try {
      const idCar = req.params.idCar;

      const ratings = await RatingVehicle.find({
             idCar
          })
          .populate('userId', 'name') // Lấy thông tin người dùng
          .populate('idCar', 'name') // Lấy tên xe
      if (ratings.length <= 0) {
          return res.status(404).json({
              message: 'Không tìm thấy đánh giá!'
          })
      }
      res.status(200).json(ratings);
  } catch (error) {
      res.status(500).json({
          message: 'Đã xảy ra lỗi!',
          error
      });
  }
};



const checkUserRated = async (req, res) => {
  const {
      userId,
      idCar
  } = req.params; // Lấy tham số từ query
  console.log("Received Params:", {
      userId,
      idCar
  });

  // Tạo điều kiện tìm kiếm động
  let searchCriteria = {};

  // Nếu có userId, thêm vào điều kiện tìm kiếm
  if (userId) {
      searchCriteria.userId = userId; // userId là chuỗi
  }

  // Nếu có idCar, thêm vào điều kiện tìm kiếm
  if (idCar) {
      searchCriteria.idCar = idCar; // idCar là chuỗi
  }


  try {
      // Tìm tất cả các đánh giá theo điều kiện tìm kiếm
      const ratings = await RatingVehicle.find(searchCriteria);

      if (ratings.length > 0) {
          console.log("Đã tìm thấy đánh giá:", ratings);
          return res.status(200).json({
              hasRated: true,
              ratings
          });
      } else {
          console.log("Không tìm thấy đánh giá");
          return res.status(200).json({
              hasRated: false
          });
      }
  } catch (error) {
      console.error("Lỗi trong quá trình tìm kiếm:", error);
      return res.status(500).json({
          error: 'Có lỗi xảy ra.'
      });
  }
};


const getAverageRatingForVehicle = async (req, res) => {
  const {
      idCar
  } = req.params;

  try {
      // Tính trung bình rating cho idCar
      const averageRating = await RatingVehicle.aggregate([{
              $match: {
                  idCar: idCar
              }
          }, // Chỉ tính rating cho idCar cụ thể
          {
              $group: {
                  _id: null,
                  avgRating: {
                      $avg: "$rating"
                  }
              }
          } // Tính trung bình từ trường "rating"
      ]);

      if (averageRating.length > 0) {
          return res.status(200).json({
              avgRating: averageRating[0].avgRating
          });
      } else {
          return res.status(200).json({
              avgRating: 0
          }); // Trường hợp chưa có đánh giá nào
      }
  } catch (error) {
      console.error("Lỗi khi tính trung bình rating:", error);
      return res.status(500).json({
          error: "Có lỗi xảy ra khi tính trung bình rating."
      });
  }

};



const countRatingsForVehicle = async (req, res) => {
  const {
      idCar
  } = req.params; // Lấy idCar từ URL

  try {
      // Đếm số lượng đánh giá của xe theo idCar
      const ratingCount = await RatingVehicle.countDocuments({
        idCar
      });

      if (ratingCount > 0) {
          return res.status(200).json({
              ratingCount
          });
      } else {
          return res.status(404).json({
              message: "Chưa có đánh giá nào cho xe này."
          });
      }
  } catch (error) {
      console.error("Lỗi khi đếm số lượng đánh giá:", error);
      return res.status(500).json({
          error: "Có lỗi xảy ra khi đếm số lượng đánh giá."
      });
  }
};


const loadAllVehiclesWithRatings = async (req, res) => {
  try {
      // Lấy tất cả các xe từ cơ sở dữ liệu
      const cars = await VehicleModel.find({});

      // Duyệt qua tất cả các xe và tính số lượng đánh giá cùng điểm trung bình cho từng xe
      const carsWithRatings = await Promise.all(cars.map(async (car) => {
          // Tìm tất cả các đánh giá liên quan đến xe hiện tại
          const ratings = await RatingVehicle.find({
              idCar: car._id
          });

          // Tính tổng số lượng đánh giá và điểm trung bình
          const totalRatings = ratings.length;
          const averageRating = totalRatings > 0 ?
              ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings :
              0; // Nếu không có đánh giá, trung bình là 0

          // Trả về thông tin xe kèm số lượng đánh giá và điểm trung bình
          return {
              car: car, // Giả sử xe có thuộc tính 'name'
              totalRatings, // Số lượng đánh giá
              averageRating // Điểm đánh giá trung bình
          };
      }));

      // Trả về danh sách tất cả các xe kèm số lượng và điểm trung bình
      return res.status(200).json(carsWithRatings);
  } catch (error) {
      console.error("Lỗi khi tải thông tin đánh giá của tất cả các xe:", error);
      return res.status(500).json({
          message: "Có lỗi xảy ra khi tải thông tin đánh giá.",
          error
      });
  }
};



const countHelpFulAndNotHelpFul = async (req, res) => {
  const {
      id,
      action,
      userId
  } = req.body;

  try {
      const rating = await RatingVehicle.findById(id);

      if (!rating) {
          return res.status(404).json({
              message: "Feedback không tồn tại"
          });
      }

      // Kiểm tra xem userId đã thực hiện hành động chưa
      if (rating.userActions.get(userId)) {
          return res.status(400).json({
              message: "Bạn đã thực hiện hành động này"
          });
      }

      // Cập nhật số lượt
      if (action === "helpful") {
          rating.helpFulCount = (rating.helpFulCount || 0) + 1;
      } else if (action === "notHelpful") {
          rating.notHelpFulCount = (rating.notHelpFulCount || 0) + 1;
      } else {
          return res.status(400).json({
              message: "Hành động không hợp lệ"
          });
      }

      // Lưu hành động của user
      rating.userActions.set(userId, action);
      await rating.save();

      return res.status(200).json({
          helpfulCount: rating.helpFulCount,
          notHelpfulCount: rating.notHelpFulCount,
      });
  } catch (error) {
      return res.status(500).json({
          message: "Lỗi server",
          error
      });
  }
};


const getUserAction = async (req, res) => {
  const {
      id
  } = req.params;
  const {
      userId
  } = req.query;

  try {
      const rating = await RatingVehicle.findById(id);
      if (!rating) {
          return res.status(404).json({
              message: "Feedback không tồn tại"
          });
      }

      const actionTaken = rating.userActions.get(userId);
      console.log(actionTaken);

      return res.status(200).json({
          actionTaken
      });
  } catch (error) {
      return res.status(500).json({
          message: "Lỗi server",
          error
      });
  }
}


module.exports = {
  createRatingVehicle,
  getRatingByVehicle,
  checkUserRated,
  getAverageRatingForVehicle,
  countRatingsForVehicle,
  loadAllVehiclesWithRatings,
  countHelpFulAndNotHelpFul,
  getUserAction
}
