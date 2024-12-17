import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { InputAdornment, IconButton } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
function Login({ setCheckBoxForget, setCheckOTP_REG }) {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { Login, loginErr, setLoginErr, setOpen } = useContext(AuthContext)
    function handleLogin(data) {
        Login(data)
    }
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handlePassForget = () => {
        setCheckOTP_REG(false)
        setCheckBoxForget(true)
    }

    return <>

        <form action="" onSubmit={handleSubmit(handleLogin)} >
            <div className="form_group">
                <TextField onFocus={() => setLoginErr(null)} {...register("email", { required: true })} className="textField-auth" label="Email" size="small" variant="outlined" />
                {errors.email && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <div className="form_group">
                <TextField type={showPassword ? 'text' : 'password'} onFocus={() => setLoginErr(null)} {...register("password", { required: true })} className="textField-auth" label="Mật khẩu" size="small" variant="outlined" InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }} />
                {errors.email && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <p onClick={handlePassForget} className='p-forgetPass'><a >Quên mật khẩu?.</a></p>
            {/* <p>Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p> */}

            <div className="btn-group-auth">
                <button onClick={() => setOpen(false)} type='button' className='btn-auth back-home'>Về trang chủ</button>
                <button type='submit' className='btn-auth'>Đăng nhập</button>
            </div>
            {loginErr && <p className="message-errors p-err">{loginErr}</p>}
        </form>

    </>
}

export default Login
