import { useNavigate } from 'react-router-dom';
import { MdError } from "react-icons/md";
import '../../../publics/styles/BookingSuccess.scss';

const View_error = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  const handleRetryPayment = () => {
    navigate(-1); // Điều hướng về trang thanh toán
  };

  return (
    <div className="booking-success-container">
      <div className="icon-success">
        <span><MdError /></span>
      </div>
      <h2>Thanh toán thất bại !</h2>
      <p>Cảm ơn quý khách đã đặt tour tại Bee Angel.</p>
      <div className="error-buttons">
        <button className="btn-home" onClick={handleHomeRedirect}>
          Về Trang Chủ
        </button>
        <button className="btn-retry" onClick={handleRetryPayment}>
          Thanh Toán Lại
        </button>
      </div>
    </div>
  );
};

export default View_error;
