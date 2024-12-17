import { useEffect } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getoneOder } from "../../../redux/action_thunk";
import { useFindUserComment } from "../../../hooks/usefindusercomment";
import { useFindTour } from "../../../hooks/findTourFetch";
import '../../../publics/styles/BookingSuccess.scss';

const BookingSuccess = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idOrder = searchParams.get("id");

  useEffect(() => {
    dispatch(getoneOder(idOrder))
  }, [idOrder])

  const oneOder = useSelector((state) => state.oderSL.oneOder)

  console.log("đơn", oneOder);

  const { recipientUser } = useFindUserComment(oneOder.idUser);
  const { recipientTour } = useFindTour(oneOder.idTour);
  const handleHomeRedirect = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  const handleRetryPayment = () => {
    navigate('/#order-list'); // Điều hướng về trang thanh toán
  };

  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN') + '₫';
  }



  return (
    <div className="booking-success-container">
      <div className="icon-success">
        <span>✔️</span>
      </div>
      <h2>Bạn đã hoàn tất thanh toán.</h2>
      <p>Cảm ơn quý khách đã đặt tour tại Bee Angel.</p>

      <div className="booking-details">
        {recipientUser && (
          <>
            <div className="detail-row">
              <span className="label">Họ và tên</span>
              <span className="value">{recipientUser.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email</span>
              <span className="value">{recipientUser.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số điện thoại</span>
              <span className="value">{recipientUser.phone}</span>
            </div>
          </>
        )}

        {recipientTour && (
          <>
            <div className="detail-row">
              <span className="label">Tên tour</span>
              <span className="value">{recipientTour.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày bắt đầu và kết thúc</span>
              <span className="value">{oneOder.departureDate} - {oneOder.returnDate}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số lượng người</span>
              <span className="value">{oneOder.numberOfPeople} Người lớn - {oneOder.numberOfChildren} Trẻ em</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa điểm đón</span>
              <span className="value">{recipientUser?.address_don}</span>
            </div>
            <div className="detail-row">
              <span className="label">Giá tour</span>
              <span className="value red">{formatCurrency(oneOder.totalPrice)} VND</span>
            </div>
          </>
        )}

        <div className="detail-row">
          <span className="label">Trạng thái thanh toán</span>
          <span className="value green">Thanh toán hoàn thành</span>
        </div>
        <div className="detail-row">
          <span className="label">Phương thức thanh toán</span>
          <span className="value">{oneOder.paymentMethod}</span>
        </div>
      </div>
      <div className="error-buttons">
        <button className="btn-home" onClick={handleHomeRedirect}>
          Về Trang Chủ
        </button>
        <button className="btn-retry" onClick={handleRetryPayment}>
          Tiếp tục mua hàng
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;

