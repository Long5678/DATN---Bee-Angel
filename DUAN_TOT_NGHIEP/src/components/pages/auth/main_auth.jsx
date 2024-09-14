import "../../../publics/styles/auth.scss"
import Register from "./register"
import Login from "./login"

function Main_auth({ check, setCheck }) {
    return <>
       
            <div className="box-auth">
                <div className="auth-top">
                    <div className="btn-login-register">
                        <div onClick={() => setCheck(true)} className={`nut ${check ? "active-color" : ""} `}>Đăng ký</div>
                        <div onClick={() => setCheck(false)} className={`nut ${!check ? "active-color" : ""} `}>Đăng Nhập</div>

                    </div>
                    <div className="line-auth"
                        style={{
                            transform: check ? 'translateX(0)' : 'translateX(100%)'
                        }}></div>

                </div>
                <div className="auth-bottom">
                    {check ? <Register /> : <Login />}
                </div>
            </div>
      
    </>

}

export default Main_auth
