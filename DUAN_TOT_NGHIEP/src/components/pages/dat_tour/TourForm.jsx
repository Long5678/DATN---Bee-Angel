import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../publics/styles/datTour.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";

function TourForm() {
  let dispatch = useDispatch()
  const {user} = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const idTour = searchParams.get("id");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sale, setsale] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(user);
  

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo)); // Chuyển đổi từ chuỗi JSON về đối tượng
    }
  }, []);



  const handleCalculatePrice = async (people, children) => {
    try {
      const response = await axios.post(`http://localhost:3000/price/calculate-price/${idTour}`, {
        numberOfPeople: people,
        numberOfChildren: children,
      });
      setTotalPrice(response.data.totalPrice);
      setsale(response.data.sale);
      setDepositPrice(response.data.depositPrice);
      setErrorMessage("");
    } catch (error) {
      console.error("Error details:", error);
      setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      setTotalPrice(0);
      setsale(0);
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

    const paymentType = localStorage.getItem("paymentType");

    const effectiveTotalPrice = paymentType === "full" ? sale : totalPrice;

    localStorage.setItem("totalPrice", effectiveTotalPrice);
    localStorage.setItem("sale", sale);
    localStorage.setItem("depositPrice", depositPrice);
    localStorage.setItem("numberOfPeople", numberOfPeople);
    localStorage.setItem("numberOfChildren", numberOfChildren);

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    window.location.href = `/thanhtoan?id=${idTour}&people=${numberOfPeople}&children=${numberOfChildren}`;
};

  const handlePayFull = () => {
    localStorage.setItem("paymentType", "full");
    localStorage.setItem("depositPrice", 0);
    localStorage.setItem("totalPrice", sale); 
    handleSubmit();
  };

  const handlePayDeposit = () => {
    localStorage.setItem("paymentType", "deposit");
    handleSubmit();
  };

  const navigation = useNavigate()

  function handleDatTour(e) {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
    navigation(`/thanhtoan?id=${idTour}`)
}

  return (
    <div className="tour-form-container2">
      <div className="tour-form">
        <h2>Chi tiết thanh toán</h2>
        {user && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" value={user.name} placeholder="vui lòng nhập"/>
          </div>
          <div className="form-group-wrapper">
            <div className="form-group">
              <label>Ngày sinh</label>
              <input type="date"value={user.birth_day} placeholder="vui lòng nhập"/>
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <input type="text" value={user.gender} placeholder="vui lòng nhập"/>
            </div>
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" value={user.address} placeholder="vui lòng nhập"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} placeholder="vui lòng nhập"/>
          </div>
          <div className="form-tel">
            <div className="form-group col-9">
              <label>Số điện thoại</label>
              <input type="tel" value={user.phone} placeholder="vui lòng nhập"/>
            </div>
            <div className="form-group col-3">
                <button>Xác thực</button>
              </div>
          </div>
          
          <div className="form-group">
            <label>Ngày khỏi hành</label>
            <input type="number" placeholder="vui lòng nhập"/>
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
            <div className="form-flex">
              <div className="form-group col-7">
                <h3 className="ok">Tổng tiền:<span className="title-red mx-2">{totalPrice > 0 ? totalPrice : 0}</span>VND</h3>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
              <div className="form-group col-5">
                <button onClick={handlePayDeposit}>Đặt cọc 50%</button>
              </div>
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
        )}
      </div>
    </div>
  );
}

export default TourForm;
