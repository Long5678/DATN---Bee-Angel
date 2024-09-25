import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect } from "react"
import { PopupContext } from "../../../../../context/popupContext"
import { useSelector } from 'react-redux';
function DetailUser() {
    let { isPopupDetailUser, setIsPopupDetailUser } = useContext(PopupContext)
    let userOne = useSelector((state) => state.userSL.userOne)
    console.log("one", userOne);

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
                </div>
            </div>
        </div>
    </>
}

export default DetailUser