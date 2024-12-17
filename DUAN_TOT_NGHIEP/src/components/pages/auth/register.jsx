import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTPRegister } from '../../../redux/action_thunk';
import { Await } from 'react-router-dom';
import { errUser } from '../../../redux/user_slice';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { InputAdornment, IconButton } from "@mui/material";
function Register({ setCheckOTP_REG, setCheckBoxForget, setValueRegister }) {
    let dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { Register, setOpen, registerErr } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const isErrUser = useSelector((state) => state.userSL.isErrUser)

    const password = watch('pass'); // Lấy giá trị mật khẩu từ form

    const handleRegister = async (data) => {
        if (data) {
            let res = await dispatch(sendOTPRegister(data))
            console.log("res client", res);

            if (res.success) {
                console.log("đã nhận OTP");
                setCheckOTP_REG(true)
                setCheckBoxForget(true)
                setValueRegister(data)
            } else {
                console.log("Lỗi rồi");
            }
        } else {
            console.log("Thiếu dữ liệu");

        }
        // if (!data.email) {
        //     return;
        // }
        // if (!data.name) {
        //     return;
        // }

        // setIsLoading(true);
        // try {
        //     await Register(data);
        // } catch (error) {
        //     console.error("Lỗi khi đăng ký:", error);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form_group">
                    <TextField
                        {...register("name", { required: "Tên đăng ký là bắt buộc" })}
                        className="textField-auth"
                        label="Tên đăng ký"
                        size="small"
                        variant="outlined"
                    />
                    {errors.name && <p className="message-errors">{errors.name.message}</p>}
                </div>
                <div className="form_group">
                    <TextField
                        {...register("email", {
                            required: "Email không được để trống",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email không hợp lệ",
                            },
                        })}
                        onFocus={() => { dispatch(errUser("")) }}
                        className="textField-auth"
                        label="Email"
                        size="small"
                        variant="outlined"
                    />
                    {errors.email && <p className="message-errors">{errors.email.message}</p>}
                    {!errors.email && registerErr && <p className="message-errors">{registerErr}</p>}
                    {isErrUser && <p className="message-errors">Email này đã được sử dụng rồi</p>}
                </div>
                <div className="form_group">
                    <div className="d-flex-auth">
                        <TextField
                            {...register("pass", { required: "Mật khẩu là bắt buộc" })}
                            className="textField-auth"
                            label="Mật khẩu"
                            size="small"
                            variant="outlined"
                            type={showPassword ? "text" : "password"} // Đổi kiểu nhập
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            {...register("confirmPass", {
                                required: "Nhập lại mật khẩu là bắt buộc", validate: (value) => value === password || "Mật khẩu không khớp",
                            })}
                            className="textField-auth"
                            label="Nhập lại mật khẩu"
                            size="small"
                            variant="outlined"
                            type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleConfirmPasswordVisibility}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className='errors-mk'>
                        {errors.pass && <p className="message-errors">{errors.pass.message}</p>}
                        <div className='confirmPass'>
                            {errors.confirmPass && <p className="message-errors">{errors.confirmPass.message}</p>}
                        </div>
                    </div>
                </div>
                <p>
                    <input type="checkbox" required />
                    Bạn đồng ý với điều khoản của chúng tôi
                </p>
                <div className="btn-group-auth">
                    <button onClick={() => setOpen(false)} type="button" className="btn-auth back-home">Về trang chủ</button>
                    <button type="submit" className="btn-auth" disabled={isLoading}>
                        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default Register;