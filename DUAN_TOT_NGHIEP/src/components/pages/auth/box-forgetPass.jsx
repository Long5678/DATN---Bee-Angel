import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from "react-redux"
import { enterEmail } from '../../../redux/action_thunk';
import { useState } from 'react';



function Box_forgetPass({ setCheckBoxForget }) {
    let dispatch = useDispatch();
    const [email, setEmail] = useState("");
   
    
    const sendEmail = () => {
        dispatch(enterEmail(email))
    }
    return <>
        {/* <form action=""> */}
            <div className="form_group">
                <TextField onChange={(e) => setEmail(e.target.value)} value={email} className="textField-auth" label="Nhập email để đổi mật khẩu" size="small" variant="outlined" />
            </div>

            <div className="btn-group-auth">
                <button onClick={() => setCheckBoxForget(false)} style={{ marginRight: "10px" }} type='submit' className='btn-auth'>Quay lại </button>
                <button onClick={sendEmail} className='btn-auth'>Gửi </button>
            </div>
        {/* </form> */}
    </>
}

export default Box_forgetPass
