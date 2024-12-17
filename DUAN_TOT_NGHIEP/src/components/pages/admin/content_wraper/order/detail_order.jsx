import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PopupContext } from "../../../../../context/popupContext";
import "../../../../../publics/styles/detail-order.scss"
import { getOneTour, getOneUser } from "../../../../../redux/action_thunk";

function View_order() {

    let dispatch = useDispatch()
    const oneOder = useSelector((state) => state.oderSL.oneOder)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
    function handlePopup() {
        setPopupEditTour(!isPopupEditTour);
    }

    const userOne = useSelector((state) => state.userSL.userOne)
    const tourOne = useSelector((state) => state.tourSL.tourOne)

    console.log(userOne, tourOne);
    const { isPopupEditTour, setPopupEditTour } = useContext(PopupContext)

    // Mở modal khi nhấp vào ảnh
    const openImageModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + '₫';
    }

    return <>
        <div className={`${isPopupEditTour ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupEditTour ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>
                <h3>Chi tiết đơn hàng</h3>

                <div className="deposit-details">
                    <div className="detail-row">
                        <span className="label">Mã đơn hàng</span>
                        <span className="value">{"BAG-" + oneOder._id?.slice(-5).toUpperCase()}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Tên khách hàng</span>
                        <span className="value">{userOne.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Số điện thoại</span>
                        <span className="value">{userOne.phone}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Điạ chỉ</span>
                        <span className="value">{userOne.address}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Căn cước công dân</span>
                        {userOne.cardImages && userOne.cardImages.length > 0 && (
                            <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/cards%2F${userOne?.cardImages[0]}?alt=media`} alt="Mặt trước căn cước" width="100" style={{ marginRight: '-250px' }} onClick={() => openImageModal(userOne.cardImages[0])} />
                        )}
                        {userOne.cardImages && userOne.cardImages.length > 1 && (
                            <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/cards%2F${userOne?.cardImages[1]}?alt=media`} alt="Mặt sau căn cước" width="100" onClick={() => openImageModal(userOne.cardImages[1])} />
                        )}
                    </div>
                    <div className="detail-row">
                        <span className="label">Số người</span>
                        <span className="value">{oneOder.numberOfPeople} Người lớn - {oneOder.numberOfChildren}  Trẻ em</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Tên Tour</span>
                        <span className="value">{tourOne.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Tên khách sạn</span>
                        <span className="value">{oneOder.namehotel} ({oneOder.locationhotel})</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Ngày bắt đầu và kết thúc</span>
                        <span className="value">{oneOder.departureDate} - {oneOder.returnDate}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Địa điểm đón</span>
                        <span className="value">{userOne.address_don}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Tổng chi phí của tour</span>
                        <span className="value">{formatCurrency(oneOder.sale)}</span>
                    </div>
                    {oneOder.priceHotel !== 0 && (
                        <>
                            <div className="detail-row">
                                <span className="label">Tổng chi phí của khách sạn</span>
                                <span className="value">{formatCurrency(oneOder.priceHotel)}</span>
                            </div>
                        </>

                    )}
                    {oneOder.status !== 'Hoàn thành' && (
                        <>
                            <div className="detail-row">
                                <span className="label">Đã thanh toán</span>
                                <span className="value">{formatCurrency(oneOder.depositPrice + oneOder.priceHotel)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Hạn thanh toán phần còn lại</span>
                                <span className="value">{oneOder.returnDate}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Số tiền còn lại cần thanh toán</span>
                                <span className="value">{formatCurrency(oneOder.mustPay)}</span>
                            </div>
                        </>
                    )}
                    {oneOder.task_status == 'Đã hủy' && oneOder.status !== 'Đã hoàn' && (
                        <>
                            <div className="detail-row">
                                <span className="label">Tiền hoàn</span>
                                <span className="value-red">{formatCurrency(oneOder.returnPay)}</span>
                            </div>
                        </>
                    )}
                </div><div className="flex-btn-add mt-3">
                    <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                </div>
            </div>
        </div>

        {/* Modal hiển thị ảnh */}
        {isModalOpen && (
            <div className="modalIMG" onClick={closeModal}>
                <div className="modalIMG-content" onClick={(e) => e.stopPropagation()}>

                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/cards%2F${selectedImage}?alt=media`} alt="Xem ảnh" className="modal-image" />
                </div>
            </div>
        )}
    </>

}

export default View_order;