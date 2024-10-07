import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../publics/styles/datTour.scss";

function TourForm() {
  const [searchParams] = useSearchParams();
  const idTour = searchParams.get("id");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleCalculatePrice = async (people, children) => {
    try {
      const response = await axios.post(`http://localhost:3000/price/calculate-price/${idTour}`, {
        numberOfPeople: people,
        numberOfChildren: children,
      });
      setTotalPrice(response.data.totalPrice);
      setDepositPrice(response.data.depositPrice);
      setErrorMessage("");
    } catch (error) {
      console.error("Error details:", error);
      setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      setTotalPrice(0);
      setDepositPrice(0);
    }
  };

  useEffect(() => {
    handleCalculatePrice(numberOfPeople, numberOfChildren);
  }, []);

  const handlePeopleChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfPeople(value);
    handleCalculatePrice(value, numberOfChildren);
  };

  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfChildren(value);
    handleCalculatePrice(numberOfPeople, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("depositPrice", depositPrice);

    window.location.href = "/thanhtoan"
  };

  const handlePayFull = () => {
    localStorage.setItem("paymentType", "full");
    handleSubmit();
  };

  const handlePayDeposit = () => {
    localStorage.setItem("paymentType", "deposit");
    handleSubmit();
  };

  return (
    <div className="tour-form-container2">
      <div className="tour-form">
        <h2>Chi tiết thanh toán</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="vui lòng nhập"  />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="vui lòng nhập"  />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="tel" placeholder="vui lòng nhập" />
          </div>
          <div className="form-group-wrapper">
            <div className="form-group">
              <label>Số lượng du khách</label>
              <input
                type="number"
                placeholder="vui lòng nhập"
                min={1}
                max={10}
                value={numberOfPeople}
                onChange={handlePeopleChange}
              />
            </div>
            <div className="form-group">
              <label>Số Trẻ Nhỏ (Dưới 1m)</label>
              <input
                type="number"
                placeholder="vui lòng nhập"
                min={0}
                max={10}
                value={numberOfChildren}
                onChange={handleChildrenChange}
              />
            </div>
          </div>
          <div className="additional-info">
            <div className="form-group">
              <h3>Tổng tiền: <span>{totalPrice > 0 ? totalPrice : 0} VND</span></h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
            <div className="form-group">
              <button onClick={handlePayDeposit}>Đặt cọc 50%</button>
            </div>
          </div>
          <div className="additional-info">
            <div className="form-group">
              <label>Ghi chú</label>
              <textarea placeholder="Không bắt buộc"></textarea>
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">Tôi đồng ý điều khoản mà website đưa ra</label>
            </div>
            <button onClick={handlePayFull}>Thanh toán</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TourForm;
