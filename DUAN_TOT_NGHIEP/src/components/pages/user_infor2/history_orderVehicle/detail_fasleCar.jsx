import React, { useContext, useEffect } from 'react';
import { PopupContext } from '../../../../context/popupContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateStatusOrderCar } from '../../../../redux/ordervehicle_slice';
import { Notification_context } from '../../../../context/notificationContext';
function Detail_FasleCar({ orderId, setActiveTab }) {
    let dispatch = useDispatch()
    const { isPopupTBCar,setPopupTBCar, refundAmount } = useContext(PopupContext);
    const { changeNotify, setChangeNotify } = useContext(Notification_context)
    const handleConfirmCancelOrderVehicle = async () => {
        try {
            const response = await axios.post('http://localhost:3000/orderCar/timeOrder', { orderId });
            console.log('ckjfkdjfd',response.data);
            
            if (response.data) {
                console.log("okok", orderId)
                console.log("Đơn hàng đã được hủy thành công");
                dispatch(updateStatusOrderCar(response.data))
                setChangeNotify(false)
                setActiveTab(4)
                // window.location.reload();
            } else {
                console.error('Lỗi khi hủy đơn hàng:', response.data.message);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API hủy đơn hàng:', error);
        }
    };
    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN');
    }
    return <>
            {orderId ? 
            <div style={{ left: "0" }} className={`${isPopupTBCar ? "overlay-admin" : ""}`}>
                <div className={`box-popop ${isPopupTBCar ? 'showPopup' : 'nonePopup'}`}>
    
                    {/* Ensure you're checking refundAmount === 0 first */}
                    {refundAmount === 0 ? (
                        <div>
                            {/* Message for refundAmount === 0 */}
                            <p className='fs-t'>Bạn có muốn hủy xe này không? Bạn sẽ không mất phí nào!</p>
                            <button onClick={() => setPopupTBCar(false)} className='btn btn-secondary' style={{height: '6vh'}}>Đóng</button>
                            <button onClick={() => {
                                handleConfirmCancelOrderVehicle();
                                setPopupTBCar(false);
                            }} className='btn btn-primary ms-1' style={{height: '6vh'}}>Đồng ý</button>
                        </div>
                    ) : (
                        <div>
                                <p className='fs-t'>Nếu hủy xe, bạn sẽ mất <span className='status-label deposit'>{formatCurrency(Math.ceil(refundAmount))} <sup>đ</sup></span> do chính sách của chúng tôi!</p>
                            <button onClick={() => setPopupTBCar(false)} className='btn btn-secondary' style={{height: '6vh'}}>Đóng</button>
                            <button onClick={() => {
                                handleConfirmCancelOrderVehicle();
                                setPopupTBCar(false);
                            }} className='btn btn-primary ms-1' style={{height: '6vh'}}>Đồng ý</button>
                        </div>
                    )}
                </div>
            </div>
            : ""}
        </>
}

export default Detail_FasleCar;
