import { useEffect, useState } from "react";
import firebase from "./firebase";

function MainTestSMS() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");

    const setupRecaptcha = () => {
        // Kiểm tra nếu reCAPTCHA đã tồn tại để tránh khởi tạo lại
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                defaultCountry: "VN", // Đảm bảo mã quốc gia chính xác
            });
        }
    };

    const handleSendOTP = async () => {
        setupRecaptcha(); // Đảm bảo reCAPTCHA được khởi tạo trước khi gửi OTP

        const appVerify = window.recaptchaVerifier;

        await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerify)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                alert("Đã gửi OTP thành công");
            })
            .catch((error) => {
                console.error(error); // In ra lỗi để dễ dàng theo dõi
                alert("Gửi OTP thất bại: " + error.message);
            });
    };

    const handleVerifyOTP = () => {
        window.confirmationResult.confirm(otp)
            .then(() => {
                alert("Xác thực thành công");
            })
            .catch((error) => {
                console.error(error); // In ra lỗi để dễ dàng theo dõi
                alert("Xác thực thất bại: " + error.message);
            });
    };

    useEffect(() => {
        setupRecaptcha();
    }, []);

    return (
        <>
            <input
                type="text"
                placeholder="Phone Number (+84...)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendOTP}>Gửi OTP</button> <br />

            <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOTP}>Xác thực OTP</button>

            {/* Phần tử chứa reCAPTCHA */}
            <div id="recaptcha-container"></div>
        </>
    );
}

export default MainTestSMS;
