const userModel = require("../Models/userModel")
const tourModel = require('../Models/tourModel');
const orderModel = require('../Models/orderModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/sendMail")
const crypto = require("crypto")
const {
    getAuth,
} = require('firebase/auth');
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
const PDFDocument = require('pdfkit');
const fs = require('fs');
const OrderVehicle = require("../Models/orderVehicleModel");
const vehicleModel = require("../Models/vehicleModel");
const orderVehicleModel = require("../Models/orderVehicleModel");
const path = require('path');

const updatedCCCD = async (req, res) => {
    try {
        const uploadImages = []; // Array lưu trữ URL ảnh mới
        const {
            userId
        } = req.body;
        console.log("User ID:", userId);

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Xử lý ảnh mặt trước (frontCard)
        if (req.files['frontCard'] && req.files['frontCard'].length > 0) {
            // Xóa ảnh cũ nếu tồn tại
            if (user.cardImages[0]) {
                const oldFrontImageRef = ref(storages, user.cardImages[0]);
                await deleteObject(oldFrontImageRef)
                    .then(() => console.log("Old front card image deleted successfully"))
                    .catch(error => console.error("Error deleting old front card image:", error));
            }

            // Tải ảnh mới lên
            const file = req.files['frontCard'][0];
            const storageRef = ref(storages, `cards/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype
            };

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            uploadImages.push(file.originalname); // Lưu URL ảnh mới
        } else {
            uploadImages.push(user.cardImages[0]); // Giữ ảnh cũ nếu không cập nhật
        }

        // Xử lý ảnh mặt sau (backCard)
        if (req.files['backCard'] && req.files['backCard'].length > 0) {
            // Xóa ảnh cũ nếu tồn tại
            if (user.cardImages[1]) {
                const oldBackImageRef = ref(storages, user.cardImages[1]);
                await deleteObject(oldBackImageRef)
                    .then(() => console.log("Old back card image deleted successfully"))
                    .catch(error => console.error("Error deleting old back card image:", error));
            }

            // Tải ảnh mới lên
            const file = req.files['backCard'][0];
            const storageRef = ref(storages, `cards/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype
            };

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            uploadImages.push(file.originalname); // Lưu URL ảnh mới
        } else {
            uploadImages.push(user.cardImages[1]); // Giữ ảnh cũ nếu không cập nhật
        }

        // Cập nhật URL ảnh mới vào user và lưu vào cơ sở dữ liệu
        user.cardImages = uploadImages;
        await user.save();

        res.status(200).json(user);

    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({
            message: 'An error occurred while updating the card.',
            error: error.message
        });
    }
};


const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({
        _id
    }, jwtkey, {
        expiresIn: "1d"
    });
}


const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            cardImages,
            phone,
            password,
            role,
            avatar,
            address,
            address_don,
            gender,
            birth_day,
        } = req.body;
        // tìm phone

        let checkEmail = await userModel.findOne({
            email
        });

        // nếu phone ok là đã đăng ký rồi thì hiện lỗi ko cho đăng ký
        if (checkEmail) return res.status(400).json("Email này đã được đăng ký rồi...");

        // nếu thỏa mãn
        user = new userModel({
            name,
            email,
            cardImages: cardImages || "",
            phone: "",
            password,
            role,
            avatar: avatar || "",
            address: address || "",
            address_don: address_don || "",
            gender: gender || "",
            birth_day: birth_day || "",
        })

        // đoạn này mã hóa password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        try {
            await user.save();
            res.status(200).json("Đăng ký tài khoản thành công.");
        } catch (error) {
            console.error("Error saving user to MongoDB:", error); // Hiển thị lỗi rõ ràng
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
    const {
        email,
        password
    } = req.body;

    try {
        let user = await userModel.findOne({
            email
        });

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
            cardImages: user.cardImages,
            name: user.name,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            address: user.address,
            address_don: user.address_don,
            gender: user.gender,
            birth_day: user.birth_day,
            token
        });

    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// confirm password (kiểu hàm này sẽ check nếu pass word khớp với nhau thì tính tiếp )
const confirmPassword = async (req, res) => {
    const {
        id,
        password
    } = req.body

    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).json("Không tìm thấy user này");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json("Mật khẩu không khớp");
        }

        console.log("user confirm", user);
        res.status(200).json({
            message: true
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
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

const findUerByRole = async (req, res) => {
    const {
        role
    } = req.query
    if (!role) {
        return res.status(400).json({
            message: "Role không hợp lệ"
        });
    }
    try {
        const users = await userModel.find({
            role: role
        })
        if (users.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy !."
            });
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// cập nhật khóa mở khóa tài khoản
const checkBlockedUser = async (req, res, next) => {
    const {
        userId,
        isBlocked
    } = req.query; // Lấy userId từ token hoặc session

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({
            message: "Không tìm thấy user này !."
        })
        user.isBlocked = isBlocked
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Server error."
        });
    }
};

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

// update user
const updateUser = async (req, res) => {
    try {
        let {
            userId
        } = req.params;
        let user = await userModel.findById(userId)
        console.log("id cc", userId);

        console.log(user);

        let {
            name,
            phone,
            email,
            role,
            address,
            address_don,
            gender,
            birth_day,
            password
        } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;
        if (address) user.address = address;
        if (address_don) user.address_don = address_don;
        if (gender) user.gender = gender;
        if (birth_day) user.birth_day = birth_day;

        const salt = await bcrypt.genSalt(10)
        if (password) user.password = await bcrypt.hash(password, salt);

        if (user.avatar && req.file) {
            try {
                const imageFileName = decodeURIComponent(user.avatar.split('/').pop().split('?')[0]);
                const imageRef = ref(storages, imageFileName);
                await deleteObject(imageRef);


            } catch (error) {
                return res.status(500).json(error.message);
            }
        }
        // Xử lý cập nhật avatar
        if (req.file) {
            const file = req.file;
            // Tùy thuộc vào cách lưu file (local hoặc cloud), bạn cần upload file và lấy URL
            const storageRef = ref(storages, `users/${file.originalname}`);
            const metadata = {
                contentType: file.mimetype
            };
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            user.avatar = downloadURL; // Cập nhật avatar
        }



        await user.save();

        res.status(200).json(user);


    } catch (error) {
        console.log(error);

    }
}



const forgotPassword = asyncHandler(async (req, res) => {
    const {
        email
    } = req.query;
    if (!email) throw new Error('Email không tồn tại!');

    // Tìm người dùng theo email
    const user = await userModel.findOne({
        email
    });
    if (!user) {
        return res.sendStatus(404);
    }
    // Tạo mã OTP ngẫu nhiên
    const otp = crypto.randomInt(100000, 999999); // Tạo OTP có 6 chữ số

    // Mã hóa OTP trước khi lưu
    const hashedOtp = crypto.createHash('sha256').update(otp.toString()).digest('hex');

    // Lưu mã OTP đã mã hóa và thời gian hết hạn vào cơ sở dữ liệu
    user.otp = hashedOtp;
    // user.otpExpires = Date.now() + 1 * 60 * 1000; // Thời gian hết hạn 1 phút
    await user.save();

    const html = `
      <div style="margin: 0 auto; width: 60%; border: 1px #9999 solid;">
          <h1 style="color: aliceblue; background: #7D4DFE; margin: 0px; padding: 15px; margin-top: -16px;">
              Yêu cầu khôi phục mật khẩu
          </h1>
          <div style="padding: 5px 15px; color: black;">
              <p>Xin chào,</p>
              <p>Mã OTP của bạn để đặt lại mật khẩu là:</p>
              <h2 style="color: #7D4DFE; font-size: 24px; text-align: center;">${otp}</h2>
              <p><strong>Lưu ý:</strong> Mã OTP này sẽ hết hạn trong vòng 1 phút.</p>
              <p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.</p>
              <p>Cảm ơn đã sử dụng Bee Angel!</p>
          </div>
      </div>
  `;

    const data = {
        email,
        html
    };

    const rs = await sendMail(data);
    return res.status(200).json({
        success: true,
        message: 'OTP đã được gửi qua email!',
        rs
    });
});

const verifyOtp = asyncHandler(async (req, res) => {
    const {
        email,
        otp
    } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: 'Thông tin không hợp lệ!'
        });
    }

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Người dùng không tồn tại!'
        });
    }

    // Mã hóa OTP mà người dùng nhập vào để so sánh với OTP đã mã hóa trong cơ sở dữ liệu
    const hashedOtp = crypto.createHash('sha256').update(otp.toString()).digest('hex');

    // Kiểm tra OTP đã mã hóa và thời gian hết hạn
    if (user.otp !== hashedOtp) {
        return res.status(400).json({
            message: 'OTP không hợp lệ hoặc đã hết hạn.'
        });
    }

    // OTP verified, clear OTP and set user as verified
    user.otp = undefined;
    await user.save();

    return res.sendStatus(204);
});

const resetPassword = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!password || !email) {
        throw new Error('Thông tin không hợp lệ!');
    }

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Người dùng không tồn tại!'
        });
    }

    if (user.password === password) {
        return res.status(400).json({
            success: false,
            message: 'trùng mật khẩu cũ!'
        });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Cập nhật mật khẩu thành công!'
    });
});



// hàm gửi mã OTP
const sendOTP = asyncHandler(async (req, res) => {
    const {
        phone
    } = req.body;

    if (!phone) throw new Error('Phone không tồn tại!');
    const user = await userModel.findOne({
        phone
    });

    if (!user) throw new Error('User không tồn tại!');

    // Tạo mã OTP 
    const otp = user.createOtpchangedToken();
    // Lưu lại user sau khi tạo OTP
    await user.save();
});

const resClient = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;
    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({
        email
    });

    const order = await orderModel.findById(id)
    const tour = await tourModel.findById(order.idTour);
    const userone = await userModel.findById(order.idUser)
    if (!user) throw new Error('user không tồn tại !');

    const html = `<div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
        <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư nhắc nhở thanh toán!</h1>
        <div style="padding: 15px; color: black;">
            <p>Xin chào ${userone.name},</p>
            <p>Bạn đã đặt tour <strong>${tour.name}</strong> trên Bee-Angle và hiện tại vẫn còn phần thanh toán chưa hoàn tất.</p>
            <p><strong>Lưu ý:</strong> Bạn bắt buộc phải hoàn tất thanh toán phần còn lại trong vòng <strong>3 ngày</strong> kể từ ngày kết thúc tour.</p>
            <p>Vui lòng thực hiện thanh toán tại đường dẫn sau để tránh các vấn đề phát sinh:</p>
            <a href="${process.env.URL_Frontend}/thanhtoan_conlai?id=${id}" style="color: red; text-decoration: none;">
                Thanh toán phần còn lại
            </a>
            <p>Trong trường hợp không thực hiện thanh toán đúng hạn, chúng tôi có quyền áp dụng các biện pháp cần thiết để thu hồi khoản tiền còn thiếu.</p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        </div>
    </div>`;

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



const resClientThanks = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;
    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({
        email
    });
    const order = await orderModel.findById(id)
    const tour = await tourModel.findById(order.idTour);
    const userone = await userModel.findById(order.idUser)
    if (!user) throw new Error('user không tồn tại !');

    const html = `
        <div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
            <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư cảm ơn.</h1>
            <div style="padding: 15px; color: black;">
                <p>Xin chào ${userone.name},</p>
                <p>Cảm ơn bạn đã tham gia chuyến tour <strong>${tour.name}</strong> cùng Bee-Angle. Chúng tôi rất vui khi biết rằng bạn đã có một trải nghiệm tuyệt vời!</p>
                <p>Chúng tôi hy vọng chuyến đi đã mang lại cho bạn những kỷ niệm đáng nhớ và những trải nghiệm thú vị. Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, đừng ngần ngại chia sẻ với chúng tôi!</p>
                <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi rất mong được phục vụ bạn trong những chuyến đi tiếp theo!</p>
            </div>
        </div>
        `;

    const data = {
        email,
        html
    };

    // Gọi hàm sendMail để gửi email
    const rs = await sendMail(data);
    return res.json({
        success: true,
        rs // Trả về kết quả gửi email
    });
});

const resClientRefund = async ({
    email,
    id
}) => {
    if (!email) throw new Error('Email không tồn tại!');

    const user = await userModel.findOne({
        email
    });
    const order = await orderModel.findById(id);
    const tour = await tourModel.findById(order.idTour);
    const userone = await userModel.findById(order.idUser);

    if (!user) throw new Error('Người dùng không tồn tại!');
    if (!order) throw new Error('Đơn hàng không tồn tại!');

    // Nội dung email thông báo hoàn tiền
    const html = `
        <div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
            <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thông báo hoàn tiền</h1>
            <div style="padding: 15px; color: black;">
                <p>Xin chào ${userone.name},</p>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                <p>Chúng tôi xin thông báo rằng số tiền <strong>${order.returnPay.toLocaleString()} VND</strong> đã được hoàn lại thành công vào tài khoản của bạn liên quan đến chuyến tour <strong>${tour.name}</strong>.</p>
                <p>Nếu bạn có bất kỳ thắc mắc nào về việc hoàn tiền, vui lòng liên hệ với chúng tôi để được hỗ trợ.</p>
                <p>Chân thành cảm ơn bạn và hy vọng sẽ được phục vụ bạn trong tương lai!</p>
                <p>Trân trọng,</p>
                <p>Bee-Angle Team</p>
            </div>
        </div>
    `;

    const data = {
        email,
        html
    };

    // Gửi email
    const rs = await sendMail(data);

    return {
        success: true,
        message: `Đã hoàn tiền cho khách hàng ${userone.name}`,
        refundAmount: order.returnPay,
        rs
    };
};

const resClientHT = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;

    if (!email) throw new Error('Email không tồn tại!');

    const user = await userModel.findOne({
        email
    });
    const order = await orderModel.findById(id);
    const tour = await tourModel.findById(order.idTour);
    const userone = await userModel.findById(order.idUser);

    if (!user) throw new Error('User không tồn tại!');

    // Tạo nội dung HTML cho email
    const html = `<div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
            <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư cảm ơn.</h1>
            <div style="padding: 15px; color: black;">
                <p>Xin chào ${userone.name}</p>
                <p>Cảm ơn bạn đã hoàn tất thanh toán cho tour <strong>${tour.name}</strong> trên Bee-Angle.</p>
                <p>Chúng tôi hy vọng bạn có một trải nghiệm tuyệt vời!</p>
                <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
            </div>
        </div>`;

    // Tạo file PDF hóa đơn
    const pdfPath = await createInvoicePDF({
        invoiceNumber: "BAG-" + order._id.toString().slice(-5).toUpperCase(),
        customerName: userone.name,
        tourName: tour.name,
        hotelname: order.namehotel,
        hotelLocation: order.locationhotel,
        invoiceDate: new Date().toLocaleDateString(),
        amount: (order.sale + order.priceHotel),
        ngaydi: order.departureDate,
        ngayve: order.returnDate,
        adults: order.numberOfPeople,
        children: order.numberOfChildren,
        totalPeople: (order.numberOfPeople + order.numberOfChildren),
        customerPhone: userone.phone,
        pickupLocation: userone.address_don,
        paymentMethod: order.paymentMethod,
        priceTour: tour.price,
        priceHotel: order.priceHotel
    });

    // Gọi hàm sendMail và đính kèm PDF
    const mailData = {
        email,
        html,
        attachments: [{
            filename: pdfPath.split('/').pop(),
            path: pdfPath
        }]
    };

    const rs = await sendMail(mailData);

    // Xóa file PDF sau khi gửi thành công
    fs.unlinkSync(pdfPath);

    res.json({
        success: true,
        rs
    });
});

// Hàm tạo PDF hóa đơn
function createInvoicePDF(data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filename = `Hóa đơn thanh toán_${data.customerName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
        const filePath = `./${filename}`;
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Đặt font tiếng Việt
        doc.font(__dirname + '/../fonts/DejaVuSans.ttf'); // Đảm bảo đường dẫn đúng
        // Thêm logo với đường dẫn tuyệt đối
        const logoPath = path.join(__dirname, '../uploads/logo1.jpg');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 20, {
                    width: 125
                }) // Đặt logo ở góc trên bên trái
                .moveDown(1);
        } else {
            console.error('Logo file not found:', logoPath);
        }

        // Tiêu đề
        doc.fontSize(24).text("HÓA ĐƠN THANH TOÁN TOUR", {
            align: 'center'
        });
        doc.moveDown();

        // Mã số hóa đơn và ngày xuất
        doc.fontSize(12)
            .text(`Mã số hóa đơn: ${data.invoiceNumber}`)
            .text(`Ngày xuất hóa đơn: ${data.invoiceDate}`)
            .moveDown();

        // Thông tin tour và khách hàng
        doc.fontSize(14).text("Thông tin tour:");
        doc.fontSize(12)
            .text(`Tên khách hàng: ${data.customerName}`)
            .text(`Tên tour: ${data.tourName}`)
            if (data.hotelname !== "" && data.hotelLocation !== "") {
                doc.text(`Tên khách sạn: ${data.hotelname} (${data.hotelLocation})`)
            }
            doc.text(`Thời gian đi và kết thúc: ${data.ngaydi} - ${data.ngayve}`)
            .text(`Số lượng người: ${data.totalPeople} (Người lớn: ${data.adults}) (Trẻ em: ${data.children})`)
            .text(`SDT khách: ${data.customerPhone}`)
            .text(`Địa điểm đón: ${data.pickupLocation}`)
            .text(`Hướng dẫn viên: Trương Văn Viên`)
            .moveDown();

        // Đơn giá và tổng tiền
        doc.fontSize(14).text("Thông tin thanh toán:");
        doc.fontSize(12)
            .text(`Giá tour: ${data.priceTour} VND (1 ngày)`)
            .text(`Giá khách sạn: ${data.priceHotel} VND`)
            .text(`Tổng tiền: ${data.amount} VND`)
            .moveDown();

        // Thông tin thanh toán
        doc.fontSize(14).text("Thông tin thanh toán:");
        doc.fontSize(12)
            .text(`Hình thức thanh toán: ${data.paymentMethod}`)
            .moveDown();

        // Thông tin công ty
        doc.fontSize(14).text("Thông tin công ty:");
        doc.fontSize(12)
            .text(`Tên công ty: Công TY TNHH Tour BeeAngel`)
            .text(`Địa chỉ: 116 Nguyễn Thị Thập, Đà Nẵng`)
            .text(`Email liên hệ: BeeAngel@gmail.com`)
            .moveDown();

        // Lời cảm ơn
        doc.fontSize(14).text("Cảm ơn quý khách đã tin tưởng dịch vụ của chúng tôi!", {
            align: 'center'
        });

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', (err) => reject(err));
    });
}


const resClientThanksCar = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;
    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({
        email
    });
    const order = await orderVehicleModel.findById(id)
    const car = await vehicleModel.findById(order.idCar);
    const userone = await userModel.findById(order.idUser)
    if (!user) throw new Error('user không tồn tại !');

    const html = `
          <div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
              <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư cảm ơn.</h1>
              <div style="padding: 15px; color: black;">
                  <p>Xin chào ${userone.name},</p>
                  <p>Cảm ơn bạn đã tham gia đặt xe <strong>${car.name}</strong> cùng Bee-Angle. Chúng tôi rất vui khi biết rằng bạn đã có một trải nghiệm tuyệt vời!</p>
                  <p>Chúng tôi hy vọng chuyến đi đã mang lại cho bạn những kỷ niệm đáng nhớ và những trải nghiệm thú vị. Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào, đừng ngần ngại chia sẻ với chúng tôi!</p>
                  <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi rất mong được phục vụ bạn trong những chuyến đi tiếp theo!</p>
              </div>
          </div>
          `;

    const data = {
        email,
        html
    };

    // Gọi hàm sendMail để gửi email
    const rs = await sendMail(data);
    return res.json({
        success: true,
        rs // Trả về kết quả gửi email
    });
});


const resClientCar = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;
    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({
        email
    });

    const order = await OrderVehicle.findById(id)
    const car = await vehicleModel.findById(order.idCar);
    const userone = await userModel.findById(order.idUser)
    if (!user) throw new Error('user không tồn tại !');

    const html = `<div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
      <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư nhắc nhở thanh toán !</h1>
      <div style="padding: 15px; color: black;">
          <p>Xin chào ${userone.name}</p>
          <p>Bạn đã đặt xe <strong>${car.name}</strong> trên Bee-Angle và hiện tại vẫn còn phần thanh toán đã hoàn tất.</p>
          <a href="${process.env.URL_Frontend}/hoanthanh?id=${id}" style="color: red; text-decoration: none;">
              Hoàng thành
          </a>
          <p><strong>Lưu ý:</strong> Nếu bạn không thanh toán đúng hạn, chúng tôi có thể liên hệ với bạn để sắp xếp việc thanh toán phần còn lại sau xe.</p>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
      </div>
    </div>`;

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



const resClientHC = asyncHandler(async (req, res) => {
    const {
        email,
        id
    } = req.query;
    console.log("email và id", email, id);

    if (!email) throw new Error('email không tồn tại !');

    const user = await userModel.findOne({
        email
    });
    const order = await OrderVehicle.findById(id)
    const car = await vehicleModel.findById(order.idCar);
    const userone = await userModel.findById(order.idUser)
    if (!user) throw new Error('user không tồn tại !');

    const html = `<div style="margin: 0 auto; width: 60%; border: 1px solid #999;">
          <h1 style="color: white; background: #7D4DFE; margin: 0; padding: 15px;">Thư cảm ơn.</h1>
          <div style="padding: 15px; color: black;">
              <p>Xin chào ${userone.name}</p>
              <p>Cảm ơn bạn đã hoàn tất thanh toán cho xe <strong>${car.name}</strong> trên Bee-Angle.</p>
              <p>Chúng tôi hy vọng bạn có một trải nghiệm tuyệt vời!</p>
              <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
          </div>
      </div>`;

    // Calculate rental days and amountCar
    const rentalDays = Math.ceil((new Date(order.returnDate) - new Date(order.pickUpDate)) / (1000 * 60 * 60 * 24));
    const totalCar = car.price * (order.numberOfMotorcycles + rentalDays);
    // Tạo file PDF hóa đơn
    const pdfPath = await createInvoiceCarPDF({
        invoiceNumber: "TRX-" + order._id.toString().slice(-5).toUpperCase(),
        customerName: userone.name,
        carName: car.name,
        invoiceDate: new Date().toLocaleDateString(),
        amountCar: totalCar,
        ngaynhan: order.pickUpDate.toLocaleDateString(),
        ngaytra: order.returnDate.toLocaleDateString(),
        numberOfCar: order.numberOfMotorcycles,
        rentalDaysCar: rentalDays,
        customerPhone: userone.phone,
        shippingCar: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        priceCar: car.price,
    });

    // Gọi hàm sendMail và đính kèm PDF
    const mailData = {
        email,
        html,
        attachments: [{
            filename: pdfPath.split('/').pop(),
            path: pdfPath
        }]
    };

    const rs = await sendMail(mailData);

    // Xóa file PDF sau khi gửi thành công
    fs.unlinkSync(pdfPath);

    res.json({
        success: true,
        rs
    });
});


// Hàm tạo PDF hóa đơn
function createInvoiceCarPDF(data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filename = `invoice_${data.customerName.replace(/\s/g, '_')}_${Date.now()}.pdf`;
        const filePath = `./${filename}`;
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Đặt font tiếng Việt
        doc.font(__dirname + '/../fonts/DejaVuSans.ttf'); // Đảm bảo đường dẫn đúng

        // Thêm logo với đường dẫn tuyệt đối
        const logoPath = path.join(__dirname, '../uploads/logo1.jpg');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 20, {
                    width: 125
                }) // Đặt logo ở góc trên bên trái
                .moveDown(1);
        } else {
            console.error('Logo file not found:', logoPath);
        }
        // Tiêu đề
        doc.fontSize(23)
            .text("HÓA ĐƠN THANH TOÁN XE", {
                align: 'center',
                font: 'Helvetica-Bold'
            });

        doc.moveDown(2);

        // Mã số hóa đơn và ngày xuất
        doc.fontSize(13)
            .text(`Mã hóa đơn: ${data.invoiceNumber}`)
            .moveDown(1)
            .text(`Ngày xuất hóa đơn: ${data.invoiceDate}`)
            .moveDown(1);

        // Thông tin xe và khách hàng
        doc.fontSize(13).text("Thông tin xe:", {
            font: 'Helvetica-Bold'
        }).moveDown(1);
        doc.fontSize(12)
            .text(`Tên khách hàng: ${data.customerName}`)
            .moveDown(0.5)
            .text(`Tên xe: ${data.carName}`)
            .moveDown(0.5)
            .text(`Thời gian nhận và ngày trả: ${data.ngaynhan} - ${data.ngaytra}`)
            .moveDown(0.5)
            .text(`Số lượng xe: ${data.numberOfCar} (Số ngày: ${data.rentalDaysCar})`)
            .moveDown(0.5)
            .text(`SDT khách: ${data.customerPhone}`)
            .moveDown(0.5)
            .text(`Địa điểm giao xe: ${data.shippingCar}`)
            .moveDown(0.5)
            .text(`Hướng dẫn viên: Trương Văn Viên`)
            .moveDown(1);

        // Đơn giá và tổng tiền
        doc.fontSize(13).text("Thông tin thanh toán:")
            .moveDown(1)
        doc.fontSize(12)
            .text(`Giá xe : ${data.priceCar} VND`)
            .moveDown(0.5)
            .text(`Tổng tiền: ${data.amountCar} VND`)
            .moveDown(1);

        // Thông tin thanh toán
        doc.fontSize(13).text("Thông tin thanh toán:")
            .moveDown(1)
        doc.fontSize(12)
            .text(`Hình thức thanh toán: ${data.paymentMethod}`)
            .moveDown(1);

        // Thông tin công ty
        doc.fontSize(13).text("Thông tin công ty:")
            .moveDown(1)
        doc.fontSize(12)
            .text(`Tên công ty: Công TY TNHH Du Lịch BeeAngel`)
            .moveDown(0.5)
            .text(`Địa chỉ: 116 Nguyễn Thị Thập, Đà Nẵng`)
            .moveDown(0.5)
            .text(`Email liên hệ: BeeAngel@gmail.com`)
            .moveDown(1);

        // Lời cảm ơn
        doc.fontSize(14).moveDown(0.5).text("Cảm ơn quý khách đã tin tưởng dịch vụ của chúng tôi!", {
            align: 'center'
        });

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', (err) => reject(err));
    });
}


const otpStore = {}; // Đối tượng này sẽ lưu email và OTP tạm thời
// Hàm gửi OTP
async function sendOTP_Register(req, res) {
    const {
        email
    } = req.body;

    console.log("Email", email);


    try {
        let checkEmail = await userModel.findOne({
            email
        });

        // nếu phone ok là đã đăng ký rồi thì hiện lỗi ko cho đăng ký
        if (checkEmail) return res.status(400).json("Email này đã được đăng ký rồi...");
        // Tạo mã OTP ngẫu nhiên
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Lưu OTP và thời gian hết hạn (5 phút)
        otpStore[email] = {
            otp: otpCode,
            expiresAt: Date.now() + 3 * 60 * 1000, // Hết hạn sau 5 phút
        };

        // Gửi OTP qua console (hoặc email sau này)
        console.log(`OTP cho ${email}: ${otpCode}`);


        const html = `
      <div style="margin: 0 auto; width: 60%; border: 1px #9999 solid;">
          <h1 style="color: aliceblue; background: #7D4DFE; margin: 0px; padding: 15px; margin-top: -16px;">
              Yêu cầu xác thực email
          </h1>
          <div style="padding: 5px 15px; color: black;">
              <p>Xin chào,</p>
              <p>Mã OTP của bạn để xác thực Email là:</p>
              <h2 style="color: #7D4DFE; font-size: 24px; text-align: center;">${otpCode}</h2>
              <p><strong>Lưu ý:</strong> Mã OTP này sẽ hết hạn trong vòng 3 phút.</p>
              <p>Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.</p>
              <p>Cảm ơn đã sử dụng Bee Angel!</p>
          </div>
      </div>
  `;

        const data = {
            email,
            html
        };

        const rs = await sendMail(data);

        res.status(200).json({
            success: true,
            message: 'Mã OTP đã được gửi qua Email!',
            rs,
            otpCode
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
}

// Hàm xác thực OTP
async function verifyOTP_Register(req, res) {
    const {
        email,
        otp,
        name,
        password
    } = req.body;

    console.log("verify OTP", email, name, password, otp);


    if (!email || !otp || !name || !password) {
        return res.status(400).json({
            success: false,
            message: 'Thiếu thông tin bắt buộc'
        });
    }

    try {
        // Lấy thông tin OTP từ otpStore
        const record = otpStore[email];
        if (!record) {
            return res.status(400).json({
                success: false,
                message: 'Mã OTP không tồn tại'
            });
        }

        // Kiểm tra OTP hết hạn
        if (record.expiresAt < Date.now()) {
            delete otpStore[email]; // Xóa OTP hết hạn
            return res.status(400).json({
                success: false,
                message: 'Mã OTP đã hết hạn'
            });
        }

        // Kiểm tra OTP có khớp hay không
        if (record.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Mã OTP không chính xác'
            });
        }

        user = new userModel({
            name,
            email,
            cardImages:"",
            phone: "",
            password,
            role: "user",
            avatar:  "",
            address: "",
            address_don: "",
            gender: "",
            birth_day:"",
        })

        // đoạn này mã hóa password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();
        // Xóa OTP khỏi otpStore
        delete otpStore[email];

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công!',
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
}

// const refreshAccessToken = async (req, res) => {
//     const {
//         token
//     } = req.body;
//     console.log("token nè",token);
    

//     if (!token) {
//         return res.status(403).json("Refresh token is required");
//     }

//     try {
//         // Xác minh refresh token
//         jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//             if (err) return res.status(403).json("Invalid refresh token");

//             // Nếu token hợp lệ, tạo một access token mới
//             const newToken = createToken(user._id);
//             // const newRefreshToken = createRefreshToken(user._id);

//             res.json({
//                 // accessToken: newAccessToken,
//                 // refreshToken: newRefreshToken
//                 token: newToken
//             });
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error refreshing token',
//             error: error.message
//         });
//     }
// };



// xuất ra để file routes sử dụng
module.exports = {
    registerUser,
    loginUser,
    findUser,
    getUsers,
    findUserByPhone,
    updateUser,
    forgotPassword,
    verifyOtp,
    resetPassword,
    sendOTP,
    resClient,
    resClientHT,
    updatedCCCD,
    resClientThanks,
    resClientRefund,
    resClientCar,
    resClientHC,
    resClientThanksCar,
    findUerByRole,
    checkBlockedUser,
    confirmPassword,
    sendOTP_Register,
    verifyOTP_Register,
    // refreshAccessToken
}