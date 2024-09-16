import "../../../publics/styles/auth.scss"
import Register from "./register"
import Login from "./login"
import { useState } from "react"
import Box_forgetPass from "./box-forgetPass"
import Box_enterPass from "./box_enterPass"

function Main_auth({ check, setCheck }) {
    const [checkBoxForget, setCheckBoxForget] = useState(false)
    return <>

        <div className="box-auth">
            <div className="auth-top">
                <div className="btn-login-register">
                    {checkBoxForget ?
                        <div className="nut">Quên mật khẩu</div>
                        :
                        <>
                            <div onClick={() => setCheck(true)} className={`nut ${check ? "active-color" : ""} `}>Đăng ký</div>
                            <div onClick={() => setCheck(false)} className={`nut ${!check ? "active-color" : ""} `}>Đăng Nhập</div>
                        </>
                    }

                </div>
                {checkBoxForget ? "" :
                    <div className="line-auth"
                        style={{
                            transform: check ? 'translateX(0)' : 'translateX(100%)'
                        }}></div>
                }

            </div>
            <div className="auth-bottom">
                {checkBoxForget ?
                    <Box_forgetPass setCheckBoxForget={setCheckBoxForget}/>
                    :
                    (check ? <Register /> : <Login setCheckBoxForget={setCheckBoxForget} />)
                }

                {/* <Box_enterPass /> */}

            </div>
        </div>

    </>

}

export default Main_auth
