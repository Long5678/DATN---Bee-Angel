import axios from "axios";
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import '../../../publics/styles/BookingSuccess.scss';

const BookingSuccess = () => {
  let dispatch = useDispatch()
  const {user} = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState(null);
    const [tourDetails, setTourDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [depositPrice, setDepositPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id");
    const numberOfPeople = parseInt(searchParams.get("people"), 10);  
    const numberOfChildren = parseInt(searchParams.get("children"), 10);  

    useEffect(() => {
      if (numberOfPeople <= 0) {;
        setErrorMessage("Số lượng người lớn phải lớn hơn 0.");
        return;
      }

      if (numberOfChildren < 0) {
        setErrorMessage("Số lượng trẻ em không thể âm.");
        return;
      }

      const fetchUserInfo = () => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      };
  
      const fetchTourDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/Admin/tours/detail/${idTour}`);
          const tourData = response.data;
  
          setTourDetails(tourData);
          handleCalculatePrice(numberOfPeople, numberOfChildren);
        } catch (error) {
          console.error("Error fetching tour details:", error);
          setErrorMessage("Không thể lấy thông tin tour. Vui lòng thử lại sau.");
        }
      };
  
      const handleCalculatePrice = async (people, children) => {
        try {
          const response = await axios.post(`http://localhost:3000/price/calculate-price/${idTour}`, {
            numberOfPeople: people,
            numberOfChildren: children
          });
          const { totalPrice, sale, depositPrice } = response.data;
  
          setTotalPrice(totalPrice);
          setSale(sale);
          setDepositPrice(depositPrice);
          setErrorMessage("");
        } catch (error) {
          console.error("Error calculating price:", error);
          setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
          setTotalPrice(0);
          setSale(0);
          setDepositPrice(0);
        }
      };
  
      fetchUserInfo();
      if (idTour) {
        fetchTourDetails();
      }
    }, [idTour, numberOfPeople, numberOfChildren]);

    

  return (
    <div className="booking-success-container">
      <div className="icon-success">
        <span>✔️</span>
      </div>
      <h2>Đặt tour thành công</h2>
      <p>Cảm ơn quý khách đã đặt tour tại Bee Angel.</p>

      <div className="booking-details">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {user && (
          <>
            <div className="detail-row">
                    <span className="label">Mã đơn hàng</span>
                    <span className="value">#01234</span>
            </div>
            <div className="detail-row">
              <span className="label">Họ và tên</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Số điện thoại</span>
              <span className="value">{user.phone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa chỉ</span>
              <span className="value">{user.address}</span>
            </div>
          </>
        )}
        
        {tourDetails && !errorMessage && (
          <>
            <div className="detail-row">
              <span className="label">Tên tour</span>
              <span className="value">{tourDetails.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày bắt đầu và kết thúc</span>
              <span className="value">15/08/2024 - 18/08/2024</span>
            </div>
            <div className="detail-row">
              <span className="label">Số lượng người</span>
              <span className="value">{numberOfPeople} Người lớn - {numberOfChildren} Trẻ em</span>
            </div>
            <div className="detail-row">
              <span className="label">Địa điểm đón</span>
              <span className="value">137 Nguyễn Thị Thập, Phường Hòa Minh, Quận Liên Chiểu, TP. Đà Nẵng</span>
            </div>

            <div className="detail-row">
              <span className="label">Giá tour</span>
              <span className="value red">{totalPrice} VND</span>
            </div>
            <div className="detail-row">
              <span className="label">Giá ưu đãi</span>
              <span className="value red">{sale} VND</span>
            </div>
            <div className="detail-row">
              <span className="label">Phương thức thanh toán</span>
              <span className="value">Paypal</span>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default BookingSuccess;
