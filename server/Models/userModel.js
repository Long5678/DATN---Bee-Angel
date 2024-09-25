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
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    },
    avatar: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    birth_day: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    },
}, {
    timestamps: true,
});

userSchema.methods = {
    createPasswordchangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken;
    }
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;