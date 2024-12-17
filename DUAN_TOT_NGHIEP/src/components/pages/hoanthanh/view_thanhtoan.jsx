
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import '../../../publics/styles/BookingSuccess.scss';
import { getoneOder, getOneTour, getOneUser } from "../../../redux/action_thunk";

const BookingSuccess = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  // const [orderDetails, setOrderDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [searchParams] = useSearchParams();
  const idOrder = searchParams.get("id");  // Change to idOrder
  const priceHotel = parseFloat(localStorage.getItem("priceHotel"));

  useEffect(() => {
    if (idOrder) {
      dispatch(getoneOder(idOrder))
      dispatch(getOneTour(oneOder.idTour))
      dispatch(getOneUser(oneOder.idUser))
    }


  }, [idOrder])

  console.log("idOrder", idOrder);




  const oneOder = useSelector((state) => state.oderSL.oneOder)
  const oneTour = useSelector((state) => state.tourSL.tourOne)
  const oneUser = useSelector((state) => state.userSL.userOne)
  console.log("one111", oneOder);
  useEffect(() => {
    if (oneOder) {
      dispatch(getOneTour(oneOder.idTour))
    }

  }, [oneOder])


  useEffect(() => {
    const paymentType = localStorage.getItem("paymentType");

    if (paymentType === "full") {
      setDepositPrice(0);
    }
  }, [totalPrice]);

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
      {localStorage.getItem("paymentType") !== "full" ? (<h2>Đặt cọc thành công</h2>) : (<h2>Đặt tour thành công</h2>)}
      <p>Cảm ơn quý khách đã đặt tour tại Bee Angel.</p>

      <div className="booking-details">
        {oneUser && (
          <>
            <div className="detail-row">
              <span className="label">Họ và tên</span>
              <span className="value">{oneUser.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email</span>
              <span className="value">{oneUser.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số điện thoại</span>
              <span className="value">{oneUser.phone}</span>
            </div>
          </>
        )}

        <div className="detail-row">
          <span className="label">Tên tour</span>
          <span className="value">{oneTour.name}</span>
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
          <span className="value">{oneUser.address_don}</span>
        </div>
        <div className="detail-row">
          <span className="label">Giá tour</span>
          <span className="value red">{formatCurrency(oneOder.totalPrice)}</span>
        </div>
        {priceHotel !== 0 && (
          <div className="detail-row">
            <span className="label">Giá Khách sạn</span>
            <span className="value red">{formatCurrency(oneOder.priceHotel)}</span>
          </div>
        )}

        {localStorage.getItem("paymentType") !== "full" ? (
          <>
            <div className="detail-row">
              <span className="label">Tiền đã đặt cọc</span>
              <span className="value">{formatCurrency(oneOder.depositPrice)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số tiền còn lại cần thanh toán</span>
              <span className="value red">{formatCurrency(((oneOder.sale + oneOder.priceHotel  )- oneOder.depositPrice))}</span>
            </div>
          </>
        ) : (
          <div className="detail-row">
            <span className="label">Trạng thái thanh toán</span>
            <span className="value green">Thanh toán hoàn thành</span>
          </div>
        )}
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

