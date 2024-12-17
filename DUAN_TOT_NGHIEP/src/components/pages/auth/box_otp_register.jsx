import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTPRegister } from '../../../redux/action_thunk';
import { useState, useEffect } from 'react';
import { errUser } from '../../../redux/user_slice';

function Box_otp_register({ setCheck, setCheckBoxForget, valueRegister }) {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(180); // 3 phút = 180 giây

    const isErrUser = useSelector((state) => state.userSL.isErrUser)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer); // Dọn dẹp interval
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const handelRegsiterOTP = async () => {
        console.log("ok");
        
        let res = await dispatch(verifyOTPRegister(valueRegister?.email, otp, valueRegister?.name, valueRegister?.pass));
        if (res.success) {
            console.log("thành công");
            setCheck(false);
            setCheckBoxForget(false);
        }
    };

    return (
        <>
            <div className="form_group">
                <TextField
                    onChange={(e) => {setOtp(e.target.value) ; dispatch(errUser(""))}}
                    value={otp}
                    className="textField-auth"
                    label="Nhập mã OTP"
                    size="small"
                    variant="outlined"
                />
                <p style={{ color: "red", marginBottom: "0px" }}>
                    OTP sẽ hết hạn sau: {timeLeft > 0 ? formatTime(timeLeft) : "Hết hạn"}
                </p>
                {isErrUser && <p style={{ color: "red", marginBottom: "0px" }}>{isErrUser}</p>}
               
                <div className="btn-group-auth">
                    <button onClick={handelRegsiterOTP} className="btn-auth" disabled={timeLeft <= 0}>
                        Xác nhận OTP
                    </button>
                </div>
            </div>
        </>
    );
}

export default Box_otp_register;
