const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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

        await user.save();
        // const token = createToken(user._id)
        // res.status(200).json({ _id: user.id, name, email, token });
        res.status(200).json("Đăng ký tài khoản thành công.");

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};


const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // tìm phone
        let user = await userModel.findOne({
            email
        });

        // nếu phone mà user login không có trong csdl thì hiện lỗi
        if (!user) return res.status(400).json("Sai Email hoặc mật khẩu...")

        // đoạn này nó sẽ giải mã password trong csdl và password người dùng login
        const isValidPassword = await bcrypt.compare(password, user.password);

        // nếu mà password ko khớp thì thông báo lỗi
        if (!isValidPassword)
            return res.status(400).json("Sai SĐT hoặc mật khẩu...")

        const token = createToken(user._id)
        res.status(200).json({
            _id: user.id,
            email: user.email,
            name: user.name,
            phone,
            role: user.role,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

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



// xuất ra để file routes sử dụng
module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    findUserByPhone,
}