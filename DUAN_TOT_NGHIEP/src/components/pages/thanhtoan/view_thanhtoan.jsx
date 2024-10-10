import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../../../publics/styles/thanhtoan.scss";

function ViewThanhtoan() {
  const [userInfo, setUserInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const idTour = searchParams.get("id");
  const peopleParam = searchParams.get("people");
  const childrenParam = searchParams.get("children");

  const [numberOfPeople, setNumberOfPeople] = useState(peopleParam ? parseInt(peopleParam) : 1);
  const [numberOfChildren, setNumberOfChildren] = useState(childrenParam ? parseInt(childrenParam) : 0);

  const [tourDetails, setTourDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
      console.error("Error details:", error);
      setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      setTotalPrice(0);
      setSale(0);
      setDepositPrice(0);
    }
  };

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Admin/tours/detail/${idTour}`);
        setTourDetails(response.data);

        handleCalculatePrice(numberOfPeople, numberOfChildren);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    if (idTour) {
      fetchTourDetails();
    }
  }, [idTour, numberOfPeople, numberOfChildren]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const paymentType = localStorage.getItem("paymentType");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Adjust prices for full payment if necessary
    if (paymentType === "full") {
      setDepositPrice(0);
    }
  }, [totalPrice]);

  return (
    <div className="tour-form-container1">
      <div className="tour-form">
        <h2>Xác nhận thông tin</h2>
        {userInfo && (
          <form>
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" value={userInfo.name} readOnly />
            </div>
            <div className="form-group-wrapper">
              <div className="form-group">
                <label>Ngày sinh</label>
                <input type="date" value={userInfo.birth_day} readOnly />
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <input type="text" value={userInfo.gender} readOnly />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={userInfo.email} readOnly />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" value={userInfo.phone} readOnly />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input type="text" value={userInfo.address} readOnly />
            </div>
          </form>
        )}
      </div>
      {tourDetails && (
        <div className="price-forms">
          <div className="price-form">
            <h4>{tourDetails.name}</h4>
            <span>{tourDetails.description}</span>

            <hr />
            <div className="form-title">
              <p>Ngày khởi hành: </p>
              <span className="px-2">01/11/2024</span>
            </div>
            <div className="form-title">
              <p>Số lượng: </p>
              <span className="px-2">{numberOfPeople} Người lớn + {numberOfChildren} Trẻ em</span>
            </div>
            <hr />
            <div className="form-title">
              <p className="title-bold">Tổng cộng: </p>
              <span className="title-red px-2">{totalPrice} VND</span>
            </div>
          </div>
          <div className="price-form mt-4">
            <div className="form-title">
              <p>Giảm giá ưu đãi:</p>
              <span className="title-blue px-2">giảm 10%</span>
            </div>
            <div className="form-title">
              <p>Tổng cộng:</p>
              <span className="px-2">{sale} VND</span>
            </div>
            {localStorage.getItem("paymentType") !== "full" && (
                <div className="form-title">
                <p>Tiền đặt cọc:</p>
                <span className="px-2">{depositPrice} VND</span>
              </div>
            )}
            
            <div className="form-title">
              <p className="title-bold">Số tiền thanh toán:</p>
              <span className="px-2">
                {localStorage.getItem("paymentType") === "full" ? sale : sale - depositPrice} VND
              </span>
            </div>
            {localStorage.getItem("paymentType") !== "full" && (
                <div className="form-title">
                <p className="title-bold">Còn lại phải thanh toán:</p>
                <span className="title-red px-2">
                  {sale - depositPrice} VND
                </span>
              </div>
            )}
            
          </div>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ViewThanhtoan;
