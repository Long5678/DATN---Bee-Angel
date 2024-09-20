import "../../publics/styles/header.scss"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Main_auth from "../pages/auth/main_auth"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import Chat from "../pages/home/chat"

function Header() {
    const { open, check, setCheck, handleOpen, handleClose, user, Logout } = useContext(AuthContext)
    console.log("user", user);


    return <>
        <header className="header-user">
            <section className="main-header-user">
                <div className="list-menu-header">
                    <ul className="ul-logo">
                        <li><a href="/">BEE ANGEL</a></li>
                        <li><img width="28px" src="src/publics/image/images/image.png" alt="" /></li>
                    </ul>
                    <ul className="list-item-header">
                        <li className="li-item-header li-item-list-tour"><a href="/tours">Danh Sách Tour</a>
                            <>
                                <div className="list-tour-detail">
                                    <ul>
                                        <li className="li-box-setting li-box">Tour Huế</li>
                                        <li className="li-box-logout li-box">Tour Đà Nẵng</li>
                                        <li className="li-box-logout li-box">Tour Quảng Nam</li>
                                    </ul>
                                </div>
                            </>
                        </li>
                        <li className="li-item-header"><a href="/about">Giới Thiệu</a></li>
                        <li className="li-item-header"><a href="/tinTuc">Tin Tức</a></li>
                        <li className="li-item-header"><a href="/dieuKhoan">Điều Khoản</a></li>
                        {user ?
                            <>
                                <li className="li-user">{user.email}
                                    <div className="box-setting-logout">
                                        <ul>
                                            <li className="li-box-setting li-box"><a href="/manager">Admin</a></li>
                                            <li className="li-box-setting li-box"><a href="/user_profile">Thông tin tài khoản</a></li>
                                            <li onClick={Logout} className="li-box-logout li-box">Đăng xuất</li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                            :
                            <li className="li-item-header" onClick={handleOpen} style={{ color: "tomato" }}>Đăng nhập</li>
                        }

                    </ul>
                </div>
            </section>
        </header>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* phần này render ra tab login register */}
                <Main_auth check={check} setCheck={setCheck} />
            </Box>
        </Modal> 


       {/* <Chat /> */}
    </>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};

export default Header