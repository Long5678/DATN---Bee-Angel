import TextField from '@mui/material/TextField';

function Register() {
    return <>
        <form action="">
            <div className="form_group">
                <TextField className="textField-auth" label="Tên đăng ký" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField className="textField-auth" label="Email" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <TextField className="textField-auth" label="Số điện thoai" size="small" variant="outlined" />
            </div>
            <div className="form_group">
                <div className='d-flex-auth'>
                    <TextField className="textField-auth" label="Mật khẩu" size="small" variant="outlined" />
                    <TextField className="textField-auth" label="Nhập lại mật khẩu" size="small" variant="outlined" />
                </div>
            </div>
            <p>Bạn đăng ký là đồng ý với điều khoản sử dụng và chính sách bảo mật của Bee Angle</p>

            <div className="btn-group-auth">
                <button className='btn-auth'>Đăng ký</button>
            </div>
        </form>
    </>
}

export default Register
