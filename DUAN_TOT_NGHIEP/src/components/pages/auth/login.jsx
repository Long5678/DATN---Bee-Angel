import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

function Login({ setCheckBoxForget}) {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginErr, setLoginErr , Login} = useContext(AuthContext);

    const handleLogin = async (data) => {
        Login(data)
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form_group">
                <TextField
                    onFocus={() => setLoginErr(null)}
                    {...register("email", { required: true })}
                    className="textField-auth"
                    label="Email"
                    size="small"
                    variant="outlined"
                />
                {errors.email && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <div className="form_group">
                <TextField
                    onFocus={() => setLoginErr(null)}
                    {...register("password", { required: true })}
                    className="textField-auth"
                    label="Mật khẩu"
                    size="small"
                    variant="outlined"
                    type="password" // Added password type
                />
                {errors.password && <span className="message-errors">Vui lòng không để trống*</span>}
            </div>
            <p onClick={() => setCheckBoxForget(true)} className='p-forgetPass'><a>Quên mật khẩu?</a></p>
            <p>Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button type='submit' className='btn-auth'>Đăng nhập</button>
            </div>
            {loginErr && <p className="message-errors p-err">{loginErr}</p>}
        </form>
    );
}

export default Login;
