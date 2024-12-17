import React, { useContext, useState } from 'react';
import { PopupContext } from '../../../../context/popupContext';
import { AuthContext } from '../../../../context/authContext';
import { useSelector, useDispatch } from "react-redux";
import { getOneTour, getOneUser, getoneOder, delOder } from '../../../../redux/action_thunk';

function Detail_orderHTY(sale, depositPrice, totalPrice) {
    const { isPopupEdit, setPopupEdit } = useContext(PopupContext);
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(true);

    const oneOder = useSelector((state) => state.oderSL.oneOder)

    const userOne = useSelector((state) => state.userSL.userOne)

    const tourOne = useSelector((state) => state.tourSL.tourOne)

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);  // Định dạng DD/MM/YYYY
    }

    return (

        <div style={{ left: "0" }} className={`${isPopupEdit ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupEdit ? 'showPopup' : 'nonePopup'}`} style={{ left: '35%' }}>
                <div className="invoice-container">
                    <h4>Hóa đơn thanh toán tour</h4>
                    <div className='invoice-d'>
                        <p><b>Mã số hóa đơn: </b>{"BAG-" + oneOder._id?.slice(-5).toUpperCase()}</p>
                        <p><b>Ngày xuất hóa đơn: </b>{formatDate(oneOder.createdAt)}</p>
                    </div>
                    <div className='detail-hty-d'>
                        <div className="section">
                            <p><b>Tên khách hàng: </b>{userOne?.name}</p>
                            <p><b>Tên tour: </b>{tourOne?.name}</p>
                            <p><b>SDT khách: </b>{userOne?.phone}</p>
                            <p><b>Địa điểm đón: </b>{userOne?.address}</p>
                            <p><b>Số lượng người: </b>{oneOder?.numberOfPeople + oneOder?.numberOfChildren} (Người lớn: {oneOder?.numberOfPeople}, Trẻ em: {oneOder.numberOfChildren})</p>
                        </div>

                        <div className="section">
                            <p><b>Hướng dẫn viên: </b>Trần Lê Anh</p>
                            <p><b>Đơn giá: </b>{formatCurrency(oneOder?.sale + oneOder?.priceHotel)}</p>
                            {oneOder.status === 'Đặt cọc' ? (
                                <>
                                    <p><b>Đã cọc trước: </b>{formatCurrency(oneOder?.depositPrice)}</p>
                                    <p><b>Số nợ: </b>{formatCurrency(oneOder?.sale - oneOder?.depositPrice)}</p>
                                </>
                            ) : (
                                <p><b>Số tiền đã thanh toán: </b> {oneOder?.status}</p>
                            )}

                            <p><b>Thời gian đi và kết thúc: </b>{oneOder?.departureDate} → {oneOder?.returnDate}</p>
                        </div>
                    </div>
                    <div className="footer">
                        <p><b>Tên công ty: </b>Công Ty TNHH Tour BeeAngel</p>
                        <p><b>Địa chỉ: </b>136 Nguyễn Thị Thập, Đà Nẵng</p>
                        <p><b>Email liên hệ: </b>truanleann@gmail.com</p>
                    </div>
                    <div className='invoice-thank-you'>
                        <p className="thank-you">Cảm ơn quý khách đã tin dùng dịch vụ của chúng tôi</p>
                        <p className="thank-you">Thank you very much</p>
                    </div>
                    {oneOder?.task_status == "Hoàn tất" &&
                        <div className="paid-stamp">
                            <p>Đã thanh toán</p>
                        </div>
                    }

                </div>

                <button className='close-hty-btn' onClick={() => setPopupEdit(false)}>X</button>
            </div>
        </div>


    );
}

function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN') + ' VND';
}

export default Detail_orderHTY;
