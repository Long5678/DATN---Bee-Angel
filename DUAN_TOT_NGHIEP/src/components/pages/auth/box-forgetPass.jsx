import { TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import {  enterEmail, verifyOtp } from '../../../redux/action_thunk';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Box_forgetPass({ setCheckBoxForget }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Trạng thái chờ

    const sendEmail = async () => {
        if (!email) {
            setErrorMessage("Vui lòng nhập email!");
            return;
        }
        if (isLoading) return;
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await dispatch(enterEmail(email));
            if (response?.status === 404) {
                setErrorMessage("Email không tồn tại!");
            } else {
                setIsOtpSent(true);
                setTimeLeft(60);
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setErrorMessage("Có lỗi xảy ra trong quá trình gửi email.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setErrorMessage("Vui lòng nhập mã OTP!");
            return;
        }
        if (isLoading) return;
        setErrorMessage("");

        try {
            const response = await dispatch(verifyOtp(email, otp));
            if (response?.status === 204) {
                setIsOtpVerified(true);
            } else {
                setErrorMessage("OTP không hợp lệ.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setErrorMessage("Có lỗi xảy ra trong quá trình xác thực OTP.");
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("Mật khẩu không khớp. Vui lòng nhập lại.");
            return;
        }
        if (!newPassword || !confirmPassword) {
            setErrorMessage("Mật khẩu không được bỏ trống.");
            return;
        }
        if (isLoading) return;
        setErrorMessage("");

        try {
            await axios.put("http://localhost:3000/auth/resetpassword", {
                email,
                password: newPassword,
            });
            alert("Mật khẩu của bạn đã được cập nhật thành công!");
            window.location.href = "/";
        } catch (error) {
            console.error("Lỗi khi đặt lại mật khẩu:", error);
            setErrorMessage("Đã có lỗi xảy ra khi đặt lại mật khẩu.");
        }
    };

    useEffect(() => {
        if (timeLeft > 0 && isOtpSent && !isOtpVerified) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isOtpSent && !isOtpVerified) {
            setErrorMessage("OTP đã hết hạn. Vui lòng yêu cầu gửi lại.");
            setIsOtpSent(false);
        }
    }, [timeLeft, isOtpSent, isOtpVerified]);

    return (
        <>
            {!isOtpSent && !isOtpVerified ? (
                <div className="form_group">
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="textField-auth"
                        label="Nhập email để đổi mật khẩu"
                        size="small"
                        variant="outlined"
                    />
                    {errorMessage && <p className="message-errors">{errorMessage}</p>}
                    <div className="btn-group-auth">
                        <button
                            onClick={() => setCheckBoxForget(false)}
                            style={{ marginRight: "10px" }}
                            type="button"
                            className="btn-auth"
                            disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={sendEmail}
                            className="btn-auth"
                            disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
                        >
                            {isLoading ? "Đang gửi..." : "Gửi"} {/* Hiển thị trạng thái */}
                        </button>
                    </div>
                </div>
            ) : isOtpSent && !isOtpVerified ? (
                <div className="form_group">
                    {errorMessage && <p className="message-errors">{errorMessage}</p>}
                    <TextField
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        className="textField-auth"
                        label="Nhập mã OTP"
                        size="small"
                        variant="outlined"
                    />
                    <p style={{ color: "red" }}>OTP sẽ hết hạn sau: {timeLeft} giây</p>
                    <div className="btn-group-auth">
                        <button onClick={handleVerifyOtp} className="btn-auth">
                            Xác nhận OTP
                        </button>
                    </div>
                </div>
            ) : (
                <div className="form_group">
                    <div className="d-flex-enterPass">
                        <TextField
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ paddingRight: "10px" }}
                            className="textField-auth"
                            label="Nhập mật khẩu mới"
                            size="small"
                            variant="outlined"
                            type='password'
                        />
                        <TextField
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="textField-auth"
                            label="Nhập lại mật khẩu"
                            size="small"
                            variant="outlined"
                            type='password'
                        />
                    </div>
                    {errorMessage && <p className="message-errors">{errorMessage}</p>}
                    <div className="btn-group-auth">
                        <button onClick={handleResetPassword} className="btn-auth">
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Box_forgetPass;

