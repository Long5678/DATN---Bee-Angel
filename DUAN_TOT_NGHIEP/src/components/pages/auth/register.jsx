import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

function Register() {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { Register } = useContext(AuthContext)
    function handleRegsiter(data) {
        
        Register(data)
    }
    
    return <>
        <form action="" onSubmit={handleSubmit(handleRegsiter)} >
            <div className="form_group">
                <TextField {...register("name", { required: true })} className="textField-auth" label="Tên đăng ký" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField {...register("email", { required: true })} className="textField-auth" label="Email" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField {...register("phone", { required: true })} className="textField-auth" label="Số điện thoai" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <div className='d-flex-auth'>
                    <TextField {...register("pass", { required: true })} className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
                    <TextField className="textField-auth" label="Nhập lại mật khẩu" size="small" variant="outlined" />
                    <input {...register("role")} value="user" type="hidden" />
                </div>
            </div>
            <p>Bạn đăng ký là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button type="submit" className='btn-auth'>Đăng ký</button>
            </div>
        </form>
    </>
}

export default Register
