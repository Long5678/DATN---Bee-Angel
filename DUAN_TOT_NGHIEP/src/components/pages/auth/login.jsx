import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { MainContext } from '../../../context/mainContext';

function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { Login } = useContext(MainContext)
    function handleLogin(data) {
        Login(data)
        // console.log(data);
        
    }
    return <>
        <form action="">
        <form action="" onSubmit={handleSubmit(handleLogin)} >
            <div className="form_group">
                <TextField className="textField-auth" label="Email" size="small" variant="outlined" />
                <TextField {...register("email", { required: true })} className="textField-auth" label="Email" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
                <TextField {...register("password", { required: true })} className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
            </div>
            <p>Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button className='btn-auth'>Đăng nhập</button>
                <button type='submit' className='btn-auth'>Đăng nhập</button>
                {/* {loginErr && <span>{loginErr}</span>} */}
            </div>
        </form>
    </>
}

export default Login
