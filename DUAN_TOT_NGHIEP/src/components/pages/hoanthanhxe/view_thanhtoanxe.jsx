import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import "../../../publics/styles/BookingSuccess.scss";
import { getOneUser } from "../../../redux/action_thunk";

const BookingCarSuccess = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchParams] = useSearchParams();
  const idCar = searchParams.get("id");
  const numberOfMotorcycles = parseInt(searchParams.get("carnumber"), 10);
  const [shippingAddress, setShippingAddress] = useState("");
  const [licensePlate, setLicensePlate] = useState([]);
  const userOne = useSelector((state) => state.userSL.userOne);

  useEffect(() => {
    if (numberOfMotorcycles <= 0) {
      setErrorMessage("Số lượng xe phải lớn hơn 0.");
      return;
    }

    const fetchUserInfo = () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    };

    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Admin/vehicle/${idCar}`
        );
        const carData = response.data;

        setCarDetails(carData);
        handleCalculatePrice(numberOfMotorcycles, pickUpDate, returnDate);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setErrorMessage("Không thể lấy thông tin xe. Vui lòng thử lại sau.");
      }
    };

    const handleCalculatePrice = async (
      numberOfMotorcycles,
      pickUpDate,
      returnDate,
      licensePlate
    ) => {
      try {
        const response = await axios.post(
          `http://localhost:3000/vehicle-price/${idCar}`,
          {
            numberOfMotorcycles,
            pickUpDate, // Include pick-up date
            returnDate, // Include return date
            shippingAddress, // Include shipping address
            licensePlate,
          }
        );
        const { totalPrice } = response.data;

        setTotalPrice(totalPrice);
        setErrorMessage("");
      } catch (error) {
        console.error("Error calculating price:", error);
        setErrorMessage(
          error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
        );
        setTotalPrice(0);
      }
    };

    fetchUserInfo();
    if (idCar) {
      fetchCarDetails();
    }

    // Load address from localStorage
    const storedShippingAddress = localStorage.getItem("shippingAddress");
    if (storedShippingAddress) {
      setShippingAddress(storedShippingAddress);
    }

    // Load pick-up and return dates from localStorage
    const storedPickUpDate = localStorage.getItem("pickUpDate");
    const storedReturnDate = localStorage.getItem("returnDate");
    if (storedPickUpDate) setPickUpDate(storedPickUpDate);
    if (storedReturnDate) setReturnDate(storedReturnDate);
  }, [
    idCar,
    numberOfMotorcycles,
    pickUpDate,
    returnDate,
    shippingAddress,
    licensePlate,
  ]); // Added dependencies

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const storedLicensePlate = localStorage.getItem("licensePlate");
    if (storedLicensePlate) {
      setLicensePlate(JSON.parse(storedLicensePlate));
    }
  }, []);
  useEffect(() => {
    if (user && user._id) {
      dispatch(getOneUser(user._id));
    } else {
      console.warn("User is not logged in or user ID is undefined.");
    }
  }, [user, dispatch]);
  const handleHomeRedirect = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  const handleRetryPayment = () => {
    navigate("/listxe"); // Điều hướng về trang thanh toán
  };


  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN');
  }
  return (
    <div className="booking-success-container">
      <div className="icon-success">
        <span>✔️</span>
      </div>
      <h2>Đặt xe thành công</h2>
      <p>Cảm ơn quý khách đã đặt xe tại Bee Angel.</p>

      <div className="booking-details">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {user && (
          <>
            <div className="detail-row">
              <span className="label">Họ và tên</span>
              <span className="value">{userOne.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email</span>
              <span className="value">{userOne.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số điện thoại</span>
              <span className="value">{userOne.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa chỉ</span>
              <span className="value">{userOne.address}</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa chỉ giao xe</span>
              <span className="value">{shippingAddress}</span>
            </div>

            <div className="detail-row">
              <span className="label">Biển số xe</span>
              <span className="value">{licensePlate.join(", ")}</span>{" "}
              {/* Hiển thị biển số xe dưới dạng chuỗi */}
            </div>
          </>
        )}

        {carDetails && !errorMessage && (
          <>
            <div className="detail-row">
              <span className="label">Tên xe</span>
              <span className="value">{carDetails.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày nhận và ngày trả</span>
              <span className="value">{`${formatDate(
                pickUpDate
              )} - ${formatDate(returnDate)}`}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số lượng xe</span>
              <span className="value">{numberOfMotorcycles}</span>
            </div>

            <div className="detail-row">
              <span className="label">Tổng tiền</span>
              <span className="value">{formatCurrency(totalPrice)} <sup>đ</sup></span>
            </div>
            <div className="detail-row">
              <span className="label">Phương thức thanh toán</span>
              <span className="value">Paypal</span>
            </div>
          </>
        )}

        <div className="error-buttons">
          <button className="btn-home" onClick={handleHomeRedirect}>
            Về Trang Chủ
          </button>
          <button className="btn-retry" onClick={handleRetryPayment}>
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCarSuccess;
