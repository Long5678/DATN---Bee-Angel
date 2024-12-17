import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react"
import { PopupContext } from "../../../../../context/popupContext"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../../redux/action_thunk';
import { AuthContext } from '../../../../../context/authContext';
function DetailUser() {
    let dispatch = useDispatch()
    let { isPopupDetailUser, setIsPopupDetailUser } = useContext(PopupContext)
    let {user} = useContext(AuthContext)
    let userOne = useSelector((state) => state.userSL.userOne)
    console.log("one", userOne);

    const [roleType, setRoleType] = useState("");
    useEffect(() => {
        setRoleType(userOne?.role)
    }, [userOne])

    const handelEditRole = (role) => {
        setRoleType(role)
        let formData = new FormData()
        formData.append("role", role)
        dispatch(updateUser(userOne?._id, formData))
    }

    return <>
        <div className={`${isPopupDetailUser ? "overlay-admin-user" : ""}`}>
            <div className={`box-popop ${isPopupDetailUser ? 'showPopup' : 'nonePopup'}`}>
                <div className="modal-flex-close">
                    <div><h3>Thông tin tài khoản</h3></div>
                    <div className='btn-close-user' onClick={() => setIsPopupDetailUser(false)}><CloseIcon /></div>
                </div>
                <div className='bg-avatar'>
                    {userOne?.avatar
                        ?
                        <img src={userOne.avatar} alt="" />
                        :
                        <img src="/src/publics/image/avatar_null.jpg" alt="" />
                    }
                </div>

                <div className='name-img'>
                    <div className='avatar-user'>
                        {userOne?.avatar
                            ?
                            <img src={userOne.avatar} alt="" />
                            :
                            <img src="/src/publics/image/avatar_null.jpg" alt="" />
                        }
                    </div>
                    <div className='name'>{userOne?.name}</div>
                </div>
                <div className='line'></div>
                <div className='profile-user'>
                    <h4>Thông tin cá nhân</h4>
                    <div className='group-grow'>
                        <div className='key'>Giới tính</div>
                        <div className='value'>{userOne?.gender ? userOne.gender : "Chưa cập nhật"}</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Điện thoại</div>
                        <div className='value'>{userOne?.phone}</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Email</div>
                        <div className='value'>{userOne?.email}</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Địa chỉ</div>
                        <div className='value'>{userOne?.address ? userOne.address : "Chưa cập nhật"}</div>
                    </div>
                    <div className='group-grow'>
                        <div className='key'>Vai trò</div>
                        {user?.role === "admin" ?
                            <select onChange={(e) => handelEditRole(e.target.value)} value={roleType} style={{ flex: "1.7" }} className="value form-select form-select-sm" aria-label="Small select example">
                                <option value="user">Khách hàng</option>
                                <option value="staff">Nhân viên</option>
                                {/* <option value="admin">Quản trị</option> */}
                            </select>
                            :
                            <div className='value'>{userOne?.role === "staff" ? "Nhân viên" : "Khách hàng"}</div>

                        }

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DetailUser