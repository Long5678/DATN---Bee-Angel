import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import "../../../publics/styles/thanhtoan.scss";
import { getOneUser } from "../../../redux/action_thunk";

function ViewThanhtoanXe() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const idCar = searchParams.get("id");
  const carParam = searchParams.get("carnumber");
  const [numberOfMotorcycles, setNumberOfMotorcycles] = useState(carParam ? parseInt(carParam) : 1);
  const [carDetails, setCarDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(() => {
    return parseInt(localStorage.getItem("totalPrice")) || 0;
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [pickUpDate, setPickUpDate] = useState(localStorage.getItem("pickUpDate") || "");
  const [returnDate, setReturnDate] = useState(localStorage.getItem("returnDate") || "");
  const [shippingAddress, setShippingAddress] = useState(localStorage.getItem("shippingAddress") || "");
  const [licensePlate, setLicensePlate] = useState(JSON.parse(localStorage.getItem("licensePlate")) || []);
  const userOne = useSelector((state) => state.userSL.userOne);
  // const licensePlate = localStorage.getItem("licensePlate");
  useEffect(() => {
    if (user && user._id) {
      dispatch(getOneUser(user._id));
    }
  }, [user, dispatch]);

  const handleCalculatePrice = async (numberOfMotorcycles, pickUpDate, returnDate, shippingAddress, licensePlate) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/vehicle-price/${idCar}`,
        {
          numberOfMotorcycles,
          pickUpDate,
          returnDate,
          shippingAddress,
          licensePlate
        }
      );
      const { totalPrice } = response.data;
      setTotalPrice(totalPrice);
      localStorage.setItem("totalPrice", totalPrice); // Lưu totalPrice vào localStorage

      setErrorMessage("");
    } catch (error) {
      console.error("Error details:", error);
      setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Admin/vehicle/${idCar}`);
        setCarDetails(response.data);
        handleCalculatePrice(numberOfMotorcycles, pickUpDate, returnDate, shippingAddress, licensePlate);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    if (idCar) {
      fetchCarDetails();
    }
  }, [idCar]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  let urlFrontCar = localStorage.getItem("fileFrontUrlCar")
  let urlBackCar = localStorage.getItem("fileBackUrlCar")

  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN');
  }
  return (
    <div className="tour-form-container1">
      <div className="tour-form">
        <h2>Xác nhận thông tin</h2>
        {user && userOne && (
          <form>
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" value={userOne.name || ""} readOnly />
            </div>
            <div className="form-group-wrapper">
              <div className="form-group">
                <label>Ngày sinh</label>
                <input type="text" value={userOne.birth_day || ""} readOnly />
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <input type="text" value={userOne.gender || ""} readOnly />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={userOne.email || ""} readOnly />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" value={userOne.phone || ""} readOnly />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input type="text" value={userOne.address || ""} readOnly />
            </div>
            <div className="form-group">
              <label>Địa chỉ giao xe</label>
              <input type="text" value={shippingAddress || ""} readOnly />
            </div>
            <div className="form-group">
              <label>Biển số xe</label>
              <input type="text" value={licensePlate.join(', ') || []} readOnly />
            </div>
            <div className="form-group">
              <label>Ảnh bằng lái xe</label>
              <div className="d-flex">
                <div className="img-thanhToan-blx">
                  <img src={urlFrontCar} alt="Mặt trước" style={{ width: "100px", height: "70px", objectFit: "cover" }} />
                </div>

                <div className="img-thanhToan-blx" style={{ marginRight: '2px' }}>
                  <img src={urlBackCar} alt="Mặt sau" style={{ width: "100px", height: "70px", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {carDetails && (
        <div className="price-forms">
          <div className="price-form">
            <h4>{carDetails.name}</h4>
            <span>{carDetails.description}</span>
            <hr />
            <div className="form-title">
              <p>Số lượng: </p>
              <span className="px-2">{numberOfMotorcycles}</span>
            </div>
            <hr /><div className="form-title">
              <p className="title-bold">Tổng cộng: </p>
              <span className="title-red px-2">{formatCurrency(totalPrice)} <sup>đ</sup></span>
            </div>
          </div>

          <div className="price-form mt-4">
            <div className="form-title">
              <p>Ngày nhận:</p>
              <span className="px-2">
                {pickUpDate ? formatDate(pickUpDate) : "Chưa chọn ngày nhận"}
              </span>
            </div>
            <div className="form-title">
              <p>Ngày trả:</p>
              <span className="px-2">
                {returnDate ? formatDate(returnDate) : "Chưa chọn ngày trả"}
              </span>
            </div>
            <div className="form-title">
              <p className="title-bold">Số tiền thanh toán:</p>
              <span className="px-2">{formatCurrency(totalPrice)} <sup>đ</sup></span>
            </div>
            {localStorage.getItem("paymentType") !== "full" && (
              <div className="form-title">
                <p className="title-bold">Số tiền thanh toán:</p>
                <span className="title-red px-2">{formatCurrency(totalPrice)} <sup>đ</sup></span>
              </div>
            )}
          </div>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ViewThanhtoanXe;
