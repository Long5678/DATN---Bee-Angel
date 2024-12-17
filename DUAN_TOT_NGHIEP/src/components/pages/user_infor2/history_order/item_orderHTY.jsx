import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PopupContext } from '../../../../context/popupContext';
import Detail_fasleTour from './detail_fasleTour'; // Điều chỉnh import nếu cần
import Detail_orderHTY from './detail_orderHTY'; // Điều chỉnh import nếu cần
import { AuthContext } from '../../../../context/authContext';
import { useDispatch } from 'react-redux';
import { getOneTour, getoneOder } from '../../../../redux/action_thunk';
import { useFindTour } from '../../../../hooks/findTourFetch';

function Item_orderHTY({ _id, idTour, numberOfPeople, numberOfChildren, status, task_status, createdAt, depositPrice, sale, totalPrice, departureDate, priceHotel, returnDate, setActiveTab }) {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const { setPopupEdit, setPopupTBtour, refundAmount, setRefundAmount } = useContext(PopupContext);

    const [selectedOrderId, setSelectedOrderId] = useState(null); // State để lưu ID đơn hàng đã chọn

    useEffect(() => {
        if (user._id && user) {
            dispatch(getOneTour(idTour));
        }
    }, [user._id, dispatch, idTour]);

    let { recipientTour } = useFindTour(idTour)

    function handlevieworder() {
        dispatch(getoneOder(_id))
        dispatch(getOneTour(idTour))
        setPopupEdit(true)

        console.log("okokkokoo",_id)
    }
    
    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + '₫';
    }

    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);  // Định dạng DD/MM/YYYY
    }

    const handleCancelTour = async () => {
        const depositAmount = status === 'Hoàn thành' ? (sale + priceHotel) : (depositPrice + priceHotel); // Chọn số tiền đặt cọc dựa trên trạng thái
        const totalAmountPaid = (sale + priceHotel);

        const [dayDep, monthDep, yearDep] = departureDate.split('/');
        let departureDate2 = new Date(`${yearDep}-${monthDep}-${dayDep}`); // Chuyển đổi sang định dạng YYYY-MM-DD
        let departureDate3 = departureDate2; // Ngày khởi hành

        try {
            setSelectedOrderId(_id); // Lưu ID đơn hàng đã chọn

            const response = await axios.post('http://localhost:3000/Order/sumOrder', {
                orderId: _id,
                totalAmountPaid,
                depositAmount,
                departureDate: departureDate3,
            });
            console.log('Response from API:', response.data);
            if (response.data.success) {
                setRefundAmount(response.data.refundAmount);
                setPopupTBtour(true); // Hiện popup sau khi tính toán thành công
           
            } else {
                console.error('Error calculating refund:', response.data.message);
            }
        } catch (error) {
            console.error('Error when calculating refund:', error);
        }
    };

    if (!recipientTour) {
        return
    }

    return (
        <>
            <div className="item_orderHTY">
                <div className="d-flex-content-orderHTY">
                    <div className='d-flex-hty'>
                        <div className="img-orderHTY">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${recipientTour?.images[0]}?alt=media`} alt="Đại Nội Huế" />
                            </div>
                        <div className="d-flex-name-count-orderHTY">
                            <span className="name-tour-orderHTY">{recipientTour?.name}</span>
                            <span className="people-orderHTY"><b>Số lượng người:</b> {numberOfPeople + numberOfChildren} (Người lớn: {numberOfPeople}, Trẻ em: {numberOfChildren})</span>
                            <span className="people-orderHTY"><b>Thời gian đi và kết thúc:</b> {departureDate} → {returnDate}</span>
                        </div>
                    </div>

                    <section className="status-totalPrice-orderHTY">
                        <span className="date-orderHTY">Ngày đặt : {formatDate(createdAt)}</span>
                        <div className="totalPrice-orderHTY">Tổng tiền : <span>{formatCurrency(sale + priceHotel)}</span></div>

                                TT thanh toán :
                                <span className={`status-label ${status === 'Hoàn thành' ? 'completed'
                                    : status === 'Đặt cọc' ? 'deposit'
                                        : ''}`}>
                                    {status}
                                </span>

                            <div className='ok'>
                                <button onClick={handlevieworder} className="btn-detail-orderHTY">Chi tiết</button>
                                {(task_status == "Chờ xác nhận" || task_status == "Sẵn sàng khởi hành") && <button onClick={handleCancelTour} className="btn-danger-orderHTY">Hủy tour</button>}
                            </div>

                        
                        
                    </section>
                </div>
                <hr />
            </div>

            {refundAmount !== null && selectedOrderId === _id && (
                <>
                    <Detail_fasleTour 
                        orderId={_id}
                        refundAmount={refundAmount}  // Sử dụng giá trị refundAmount đã tính
                        sale={sale}  // Truyền giá trị sale
                        depositPrice={depositPrice}  // Truyền giá trị depositPrice
                        departureDate="2024-11-01"  // Truyền ngày khởi hành
                        setActiveTab={setActiveTab} // cái này là số index của tabs
                    /> 
                    <Detail_orderHTY
                        depositPrice={depositPrice}
                        sale={sale}
                        totalPrice={totalPrice}
                    />
                </>
            )}
        </>
    );
}

export default Item_orderHTY;
