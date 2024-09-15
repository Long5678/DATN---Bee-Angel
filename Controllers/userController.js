const userModel = require("../Models/userModel")
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/sendMail")
const crypto = require("crypto")

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({
        _id
    }, jwtkey, {
        expiresIn: "3d"
    });
}

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body;
        // tìm phone
        let user = await userModel.findOne({
            phone
        });
        let checkEmail = await userModel.findOne({
            email
        });

        // nếu phone ok là đã đăng ký rồi thì hiện lỗi ko cho đăng ký
        if (user ) return res.status(400).json("SĐT hoặc email này đã được đăng ký rồi...");
        if (checkEmail) return res.status(400).json("Email này đã được đăng ký rồi...");

        // nếu thỏa mãn
        user = new userModel({
            name,
            email,
            phone,
            password,
            role
        })

        // đoạn này mã hóa password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        try {
            await user.save();
            res.status(200).json("Đăng ký tài khoản thành công.");
        } catch (error) {
            console.error("Error saving user to MongoDB:", error);  // Hiển thị lỗi rõ ràng
        }
        // await user.save();
        // const token = createToken(user._id)
        // res.status(200).json({ _id: user.id, name, email, token });
        

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json("Sai Email hoặc mật khẩu...");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json("Sai Email hoặc mật khẩu...");
        }

        const token = createToken(user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
            token
        });

    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


// tìm user dựa vào id
const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// tìm All user
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// tìm user dựa vào số điện thoại
const findUserByPhone = async (req, res) => {
    let {
        phone
    } = req.params;
    try {
        const user = await userModel.findOne({
            phone
        });
        // Nếu không tìm thấy user, trả về lỗi
        if (!user) return res.status(404).json("Không tìm thấy người dùng này!");

        // Nếu tìm thấy, trả về thông tin người dùng
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({ email });
    if (!user) throw new Error('user không tồn tại !'); 

    const resetToken = user.createPasswordchangedToken(); // Tạo token đặt lại mật khẩu
    await user.save();

    const html = `Xin vui lòng click vào link sau để thay đổi mật khẩu, link sẽ hết hạn trong vào 15p tiếp theo <a href=${process.env.URL_SERVER}/auth/resetPassword/${resetToken}>Click here</a>`;

    const data = {
        email,
        html
    };

    // Gọi hàm sendMail để gửi email
    const rs = await sendMail(data);
    return res.status(200).json({
        success: true,
        rs // Trả về kết quả gửi email
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) {
        throw new Error('Nhập không hợp lệ!');
    }

    // lấy token trên url tiến hành băm 1 lần nữa rồi so sánh
    const hashedToken  = crypto.createHash('sha256').update(token).digest('hex');
    // Tìm user dựa trên token đã hash
    const user = await userModel.findOne({
        passwordResetToken: hashedToken, // tiến hành So sánh
        passwordResetExpires: { $gt: Date.now() } // Kiểm tra xem token còn hiệu lực không
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Người dùng không hợp lệ hoặc token hết hạn!'
        });
    }

    // mã hóa password sau khi người dùng resetpassword
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // xóa token và time đã tạo trước đó
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Cập nhật thành công!'
    });
});

// xuất ra để file routes sử dụng
module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    findUserByPhone,
    forgotPassword,
    resetPassword
}