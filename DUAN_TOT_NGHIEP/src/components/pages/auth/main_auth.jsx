import "../../../publics/styles/auth.scss";
import Register from "./register";
import Login from "./login";
import { useState } from "react";
import Box_forgetPass from "./box-forgetPass";
import "../../../publics/styles/reponsive/rp-auth.scss";
import Box_otp_register from "./box_otp_register";
import { useEffect } from "react";
import Loading from "../../layouts/loading";
import { useSelector } from "react-redux";

function Main_auth({ check, setCheck }) {
    const [checkBoxForget, setCheckBoxForget] = useState(false);
    const [checkOTP_REG, setCheckOTP_REG] = useState(true)
    const [valueRegister, setValueRegister] = useState(null);
    const isLoadingDM = useSelector((state) => state.danhMucSL.isLoadingDM)

    useEffect(() => {
        console.log("value RG", valueRegister);

    }, [valueRegister])
    // background - color: rgba(0, 0, 0, 0.5);
    return (
        <>
            <div className="box-auth">
  
                {isLoadingDM && <div className="overlay-auth">
                    <Loading top={38} left={45} position={"absolute"} />
                </div>}
              

                <div style={{ display: "none" }} className="auth-banner">
                    <img src="/src/publics/image/anh_nen_auth_mobile.jpg" alt="" />
                </div>

                <div className="auth-top">
                    <div className="btn-login-register">
                        {checkBoxForget ? (
                            <div className="nut">{checkOTP_REG ? "Nhập OTP" : "Quên mật khẩu"}</div>
                        ) : (
                            <>
                                <div onClick={() => setCheck(true)} className={`nut ${check ? "active-color" : ""}`}>
                                    Đăng ký
                                </div>
                                <div onClick={() => setCheck(false)} className={`nut ${!check ? "active-color" : ""}`}>
                                    Đăng Nhập
                                </div>
                            </>
                        )}
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
                        (
                            !checkOTP_REG ?
                                <Box_forgetPass setCheckBoxForget={setCheckBoxForget} />
                                :
                                <Box_otp_register setCheck={setCheck} setCheckBoxForget={setCheckBoxForget} valueRegister={valueRegister} />
                        )
                        :
                        (check ? <Register setValueRegister={setValueRegister} setCheckOTP_REG={setCheckOTP_REG} setCheckBoxForget={setCheckBoxForget} /> : <Login setCheckBoxForget={setCheckBoxForget} setCheckOTP_REG={setCheckOTP_REG} />)
                    }
                </div>
            </div>
        </>
    );
}

export default Main_auth;

