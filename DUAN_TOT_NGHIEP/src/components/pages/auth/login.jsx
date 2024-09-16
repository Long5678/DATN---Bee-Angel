import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { Login, loginErr, setLoginErr } = useContext(AuthContext)
    function handleLogin(data) {
        Login(data)
    }
    return <>
        <form action="" onSubmit={handleSubmit(handleLogin)} >
            <div className="form_group">
                <TextField onFocus={() => setLoginErr(null)} {...register("email", { required: true })} className="textField-auth" label="Email" size="small" variant="outlined" />
                {errors.email && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <div className="form_group">
                <TextField onFocus={() => setLoginErr(null)} {...register("password", { required: true })} className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
                {errors.email && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <p>Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button type='submit' className='btn-auth'>Đăng nhập</button>
            </div>
            {loginErr && <p className="message-errors p-err">{loginErr}</p>}
        </form>
    </>
}

export default Login
