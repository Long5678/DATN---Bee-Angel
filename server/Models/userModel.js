const mongoose = require("mongoose")
const crypto = require("crypto")

// ở đây là nó sẽ tạo luôn 1 cái bảng user vào csdl luôn
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    cardImages: [{
        type: String,
        // required: true
    }],
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    },
    address_don: {
        type: String
    },
    gender: {
        type: String
    },
    birth_day: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false // false là dùng đc
    }, // Trạng thái khóa tài khoản
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    },
    otpResetToken: {
        type: String
    },
    otpResetExpires: {
        type: String
    },
    otp: {
      type: String
  }
}, {
    timestamps: true,
});

userSchema.methods = {
    createPasswordchangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken;
    },
    createOtpchangedToken: function () {
        const otp = Math.floor(100000 + Math.random() * 900000); // Tạo mã OTP 6 chữ số
        this.otpResetToken = otp.toString(); // Lưu mã OTP dưới dạng chuỗi
        this.otpResetExpires = Date.now() + 2 * 60 * 1000; // Thời gian hết hạn là 2 phút
        return otp;
    }
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
