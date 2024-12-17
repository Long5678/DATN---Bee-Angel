import TextField from '@mui/material/TextField'
import Header from '../../layouts/header'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

function Box_enterPass() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Lấy token từ URL

    console.log(token);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu không khớp. Vui lòng nhập lại.");
            return;
        }

        try {
            await axios.put("http://localhost:3000/auth/resetpassword", {
                token,  // Token được lấy từ URL
                password: newPassword,
            });

            alert("Mật khẩu của bạn đã được cập nhật thành công!");
            window.location.href = "/";
        } catch (error) {
            console.error("Lỗi khi đặt lại mật khẩu:", error);
            alert("Mã xác thực không hợp lệ hoặc đã hết hạn.");
        }
    };


    return <>
        <Header />
        <div className='box-main-auth'>
            <div className='box-auth'>
                <div className="auth-top">
                    <div className="btn-login-register">
                        <div className="nut">Đặt lại mật khẩu</div>
                    </div>

                </div>
                <div className="auth-bottom">
                    <div className="form_group">
                        <div className='d-flex-enterPass' >
                            <TextField value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ paddingRight: "10px" }} className="textField-auth" label="Nhập mật khẩu" size="small" variant="outlined" />
                            <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="textField-auth" label="Nhập lại mật khẩu" size="small" variant="outlined" />
                        </div>
                    </div>

                    <div className="btn-group-auth">
                        <button onClick={handleResetPassword} className='btn-auth'>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Box_enterPass
