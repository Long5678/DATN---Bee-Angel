import React, { useContext, useEffect } from 'react';
import { PopupContext } from '../../../../context/popupContext';
import axios from 'axios';
import { Notification_context } from '../../../../context/notificationContext';
import { updateStatusOrder } from '../../../../redux/order_slice';
import { useDispatch } from 'react-redux';

function Detail_fasleTour({ orderId, depositAmount, sale, depositPrice, departureDate, setActiveTab }) {
    let dispatch = useDispatch()
    const { isPopupTBtour, setPopupTBtour, refundAmount, setRefundAmount } = useContext(PopupContext);
    const { changeNotify, setChangeNotify } = useContext(Notification_context)

    const handleConfirmCancelOrder = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Order/timeOrder', { orderId });

            if (response.data) {
                // Log dữ liệu trả về từ API
                // console.log('Hủy đơn hàng thành công:', response.data);
                // console.log("ID đơn hàng:", orderId);
                console.log("Đơn hàng đã được hủy thành công");

                // Dispatch để cập nhật trạng thái đơn hàng trong Redux
                dispatch(updateStatusOrder(response.data));
                setChangeNotify(false)
                setActiveTab(4)
                setPopupTBtour(false);

                // // Bạn có thể làm mới trang hoặc thực hiện hành động khác ở đây
                // window.location.reload(); // Nếu cần làm mới trang
            } else {
                console.error('Lỗi khi hủy đơn hàng:');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API hủy đơn hàng:', error);
        }
    };

    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + ' VNĐ';
    }

    return (
        <>
            {orderId ?
                <div style={{ left: "0" }} className={`${isPopupTBtour ? "overlay-admin" : ""}`}>
                    <div className={`box-popop ${isPopupTBtour ? 'showPopup' : 'nonePopup'}`}>

                        {/* Ensure you're checking refundAmount === 0 first */}
                        {refundAmount === 0 ? (
                            <div>
                                {/* Message for refundAmount === 0 */}
                                Bạn có muốn hủy tour này không? Bạn sẽ không mất phí nào!
                                <div>
                                    <button onClick={() => setPopupTBtour(false)} className='btn-close-cancle' >Đóng</button>
                                    <button onClick={() => {
                                        handleConfirmCancelOrder();
                                        setPopupTBtour(false);
                                    }} className='btn-close-danger'>Đồng ý</button>
                                </div>

                            </div>
                        ) : (
                            <div>
                                Nếu hủy tour, bạn sẽ mất <span className='status-label deposit'>{formatCurrency(Math.ceil(refundAmount))}</span> do chính sách của chúng tôi!
                                <div>
                                    <button onClick={() => setPopupTBtour(false)} className='btn-close-cancle' >Đóng</button>
                                    <button onClick={() => {
                                        handleConfirmCancelOrder();

                                    }} className='btn-close-danger'>Đồng ý</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                : ""}
        </>
    );
}

export default Detail_fasleTour;
