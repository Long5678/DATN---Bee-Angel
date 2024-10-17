const Rating = require('../Models/ratingModel');

const mongoose = require('mongoose');

const employeeUserId = '66fa5d974c173b4285a5dc2d';

const createRating = async (req, res) => {
    try {
        const { userId, tourId, rating, review } = req.body;

        // // Kiểm tra nếu người dùng đã đánh giá sản phẩm này
        // const existingRating = await Rating.findOne({ userId, tourId });
        // if (existingRating) {
        //     return res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm này rồi!' });
        // }

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
    const { userId, tourId } = req.query;

    // Log userId and tourId to debug
    console.log('userId:', userId);
    console.log('tourId:', tourId);

    // Validate userId and tourId
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({ error: 'Invalid userId or tourId' });
    }

    try {
        // Check if the user has rated this tour
        const existingRating = await Rating.findOne({ userId, tourId });
        if (existingRating) {
            return res.json({ hasRated: true });
        } else {
            return res.json({ hasRated: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Lỗi server' });
    }
};


module.exports = { createRating, getRatingByTour, addReplyToRating, checkUserRated }