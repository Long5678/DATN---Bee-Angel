import "../../publics/styles/header.scss"
import "../../publics/styles/reponsive/rp-header.scss"
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Main_auth from "../pages/auth/main_auth"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllDanhMuc, getOneUser } from "../../redux/action_thunk"
import Main_chatBox from "../pages/chatBox/main_chatBox"
import Main_Notification from "../pages/modalNotification/mainNotification.jsx"
import { Notification_context } from "../../context/notificationContext.jsx"
import { getNotify } from "../../redux/thunk/notification_thunk.js"
import { getNotifyVehicle } from "../../redux/thunk/action_notifiVeh.js"
import axios from "axios"

function Header() {
    let dispatch = useDispatch();
    const navigation = useNavigate()
    let danhMucDatas = useSelector((state) => state.danhMucSL.danhMucDatas)
    const userOne = useSelector((state) => state.userSL.userOne)
    const { open, check, setCheck, handleOpen, handleClose, user, Logout, checkUserEdit, setCheckUserEdit } = useContext(AuthContext)
    console.log("user", user);

    const { changeNotify, setChangeNotify } = useContext(Notification_context)
    const [totalUnread, setTotalUnread] = useState(0);;
    const orderNoti = useSelector((state) => state.notifySL?.notifyDatas);
    const orderNotiVehicle = useSelector((state) => state.notifyVehicleSL?.notifyVehicleDatas);

    useEffect(() => {
        console.log('Đã thay đổi');
        dispatch(getNotify(user?._id));
    }, [changeNotify])

    useEffect(() => {
        if (user?._id) {
            dispatch(getNotifyVehicle(user._id));
        }
    }, [user, changeNotify]);

    useEffect(() => {
        if (user?._id) {
            dispatch(getNotify(user._id));
        }
    }, [user, changeNotify]);

    // Cập nhật số lượng thông báo chưa đọc
    // const orderAll = [...orderNoti, ...orderNotiVehicle]
    useEffect(() => {
        let interval;
        if (user?._id) {
            const fetchUnreadCount = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/notification/unread-count/${user._id}`);
                    console.log('Số thông báo chưa đọc:', response.data.data.totalUnread);
                    if (response.data.success && response.data.data.totalUnread !== undefined) {
                        setTotalUnread(response.data.data.totalUnread);
                    } else {
                        setTotalUnread(0);
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy số lượng thông báo chưa đọc:', error);
                }
            };

            // Gọi API ban đầu
            fetchUnreadCount();

            // Thiết lập interval để kiểm tra sau mỗi 3 giây (hoặc thời gian tùy chọn)
            interval = setInterval(fetchUnreadCount, 4000);
        }

        return () => {
            // Xóa interval khi component bị unmount
            if (interval) clearInterval(interval);
        };
    }, [user?._id]);



    useEffect(() => {
        dispatch(getAllDanhMuc())
    }, [])

    useEffect(() => {
        if (user?._id) {
            dispatch(getOneUser(user?._id))
        }
    }, [checkUserEdit])

    useEffect(() => {
        const fetchUser = async () => {
            const userOne = await dispatch(getOneUser(user?._id)); // Chờ Promise giải quyết
            if (userOne?.isBlocked === true) {
                console.log("tài khoản bị khóa");
                navigation("/blockAccount");
            }
        };

        if (user?._id) {
            fetchUser(); // Gọi hàm async
        }

    }, [dispatch, user?._id])

    function handleListTourDM(id) {
        // lấy id của nó
        navigation(`/tours?id=${id}`)
    }

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
                                        {danhMucDatas.map((item, index) => {
                                            return <li key={index} onClick={() => handleListTourDM(item._id)} className="li-box-setting li-box">{item.name}</li>
                                        })}
                                    </ul>
                                </div>
                            </>
                        </li>
                        <li className="li-item-header"><a href="/listxe">Danh sách xe</a></li>
                        <li className="li-item-header"><a href="/about">Giới Thiệu</a></li>
                        <li className="li-item-header"><a href="/tinTuc">Tin Tức</a></li>
                        <li className="li-item-header"><a href="/dieuKhoan">Điều Khoản</a></li>
                        {user ?
                            <>
                                <li className="li-user">
                                    <div className="avatar-header">
                                        {userOne?.avatar
                                            ?
                                            <img src={userOne.avatar} alt="" />
                                            :
                                            <img src="/src/publics/image/avatar_null.jpg" alt="" />
                                        }

                                    </div>
                                    <span>{userOne?.name}</span>
                                    {/* <i className="fa-solid fa-bell"></i> */}
                                    <div className="box-setting-logout">
                                        <ul>
                                            {(user?.role === "admin" || user?.role === "staff") && (
                                                <li className="li-box-setting li-box">
                                                    <a href="/manager">Admin</a>
                                                </li>
                                            )}
                                            <li className="li-box-setting li-box"><a href="/user_profile">Thông tin tài khoản</a></li>
                                            <li onClick={Logout} className="li-box-logout li-box">Đăng xuất</li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                            :
                            <li className="li-item-header" onClick={handleOpen} style={{ color: "tomato" }}>Đăng nhập</li>

                        }
                        {(user?._id && user?.role === "user") && <Main_Notification totalUnread={totalUnread} />}
                    </ul>
                </div>
            </section>
            {user?.role === "user" && <Main_chatBox />}

        </header>


        <div className="header-table-moblie">
            <div className="header-mobi-search">
                <div className="icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="box-mobi-inp"><input type="text" placeholder="Hà Nội" /></div>
            </div>
        </div>
        <Modal
            className="main-box-auth"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="mui-box-auth" sx={style}>
                {/* phần này render ra tab login register */}
                <Main_auth check={check} setCheck={setCheck} />
            </Box>
        </Modal>


    </>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
};

export default Header
