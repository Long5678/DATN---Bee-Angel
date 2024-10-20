const Rating = require('../Models/ratingModel');

const mongoose = require('mongoose');

const employeeUserId = '66fa5d974c173b4285a5dc2d';

const createRating = async (req, res) => {
    try {
        const { userId, tourId, rating, review } = req.body;

        // // Kiểm tra nếu người dùng đã đánh giá sản phẩm này
        const existingRating = await Rating.findOne({ userId, tourId });
        if (existingRating) {
            return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi!' });
        }

        // Nếu chưa có đánh giá, tạo đánh giá mới
        const newRating = new Rating({
            rating,
            review,
            userId,
            tourId

        });

        // Lưu đánh giá mới
        await newRating.save();

        // Phản hồi tự động nếu rating từ 4 sao trở lên
        if (rating >= 4) {
            const autoReply = {
                reply: 'Cảm ơn bạn đã đánh giá tích cực! Chúng tôi rất vui vì dịch vụ của chúng tôi đáp ứng được mong đợi của bạn.',
                userId: employeeUserId,  // hoặc ID của tài khoản quản trị viên
            };

            newRating.replies.push(autoReply);
        } else { // phản hồi tự động nếu rating từ 4 sao trở xuống
            const autoReply = {
                reply: 'Cảm ơn phản hồi của bạn. Chúng tôi rất tiếc vì dịch vụ của chúng tôi chưa đáp ứng được kỳ vọng của bạn.',
                userId: employeeUserId,
            };
            newRating.replies.push(autoReply);
        }

        await newRating.save();  // Lưu lại phản hồi tự động nếu có

        res.status(201).json({ message: 'Đánh giá đã được tạo thành công!', rating: newRating });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error });
    }
};

// Thêm phản hồi cho đánh giá
const addReplyToRating = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const { reply, userId } = req.body;

        const rating = await Rating.findById(ratingId);
        if (!rating) {
            return res.status(404).json({ message: 'Không tìm thấy đánh giá!' });
        }

        rating.replies.push({ reply, userId });
        await rating.save();

        res.status(200).json({ message: 'Phản hồi đã được thêm thành công!', rating });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error });
    }
};

// Lấy danh sách đánh giá
const getRatingByTour = async (req, res) => {
    try {
        const tourId = req.params.tourId;

        const ratings = await Rating.find({ tourId })
            .populate('userId', 'name')  // Lấy thông tin người dùng
            .populate('replies.userId', 'name');  // Lấy thông tin người phản hồi

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error });
    }
};


const checkUserRated = async (req, res) => {
    const { userId, tourId } = req.params; // Lấy tham số từ query
    console.log("Received Params:", { userId, tourId });

    // Tạo điều kiện tìm kiếm động
    let searchCriteria = {};

    // Nếu có userId, thêm vào điều kiện tìm kiếm
    if (userId) {
        searchCriteria.userId = userId; // userId là chuỗi
    }

    // Nếu có tourId, thêm vào điều kiện tìm kiếm
    if (tourId) {
        searchCriteria.tourId = tourId; // tourId là chuỗi
    }

    console.log("Type of userId:", typeof userId, "Value:", userId);
    console.log("Type of tourId:", typeof tourId, "Value:", tourId);

    try {
        // Tìm tất cả các đánh giá theo điều kiện tìm kiếm
        const ratings = await Rating.find(searchCriteria);

        if (ratings.length > 0) {
            console.log("Đã tìm thấy đánh giá:", ratings);
            return res.status(200).json({ hasRated: true, ratings });
        } else {
            console.log("Không tìm thấy đánh giá");
            return res.status(200).json({ hasRated: false });
        }
    } catch (error) {
        console.error("Lỗi trong quá trình tìm kiếm:", error);
        return res.status(500).json({ error: 'Có lỗi xảy ra.' });
    }
};

const getAverageRatingForTour = async (req, res) => {
    const { tourId } = req.params;
  
    try {
      // Tính trung bình rating cho tourId
      const averageRating = await Rating.aggregate([
        { $match: { tourId: tourId } }, // Chỉ tính rating cho tourId cụ thể
        { $group: { _id: null, avgRating: { $avg: "$rating" } } } // Tính trung bình từ trường "rating"
      ]);
  
      if (averageRating.length > 0) {
        return res.status(200).json({ avgRating: averageRating[0].avgRating });
      } else {
        return res.status(200).json({ avgRating: 0 }); // Trường hợp chưa có đánh giá nào
      }
    } catch (error) {
      console.error("Lỗi khi tính trung bình rating:", error);
      return res.status(500).json({ error: "Có lỗi xảy ra khi tính trung bình rating." });
    }
  };




module.exports = { createRating, getRatingByTour, addReplyToRating, checkUserRated, getAverageRatingForTour }