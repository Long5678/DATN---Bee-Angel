import TextField from '@mui/material/TextField';

function Login() {
    return <>
        <form action="">
            <div className="form_group">
                <TextField className="textField-auth" label="Email" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
            </div>
            <p>Bạn đăng nhập là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button className='btn-auth'>Đăng nhập</button>
            </div>
        </form>
    </>
}

export default Login
