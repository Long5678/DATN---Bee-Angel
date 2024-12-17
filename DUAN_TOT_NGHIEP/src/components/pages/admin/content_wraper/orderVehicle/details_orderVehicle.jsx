import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import "../../../../../publics/styles/BookingSuccess.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOneCar } from "../../../../../redux/action_vehicle";
const DetailsOrderVehicle = () => {
  let dispatch = useDispatch();
  const [isZoomed, setIsZoomed] = useState(false); // Trạng thái phóng to/thu nhỏ
  const [zoomedImage, setZoomedImage] = useState(""); // Quản lý ảnh phóng to
  const { isPopupDetails, handlePopupDetails } = useContext(PopupContext);
  const oneOderVehicle = useSelector(
    (state) => state.orderVehicleSL.oneOderVehicle
  );
  // lỗi đã fig
  console.log("oneOderVehicle", oneOderVehicle.order);
  const userOne = useSelector((state) => state.userSL.userOne);
  const carOne = useSelector((state) => state.carSL.carOne);
  console.log(userOne, carOne);
  const handleDetails = () => {
    handlePopupDetails();
  };
  // function formatCurrency(value) {
  //   return Number(value).toLocaleString('vi-VN') + '₫';
  // }
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return an empty string if dateString is null or undefined
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Return an empty string if date is invalid
    return new Intl.DateTimeFormat("vi-VN").format(date);
  };

  useEffect(() => {
    if (oneOderVehicle?.order) {
      dispatch(getOneCar(oneOderVehicle.order.idCar));
    }
  }, [oneOderVehicle?.order]);


  const handleImageClick = (image) => {
    setZoomedImage(image);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setZoomedImage("");
    setIsZoomed(false);
  };

  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN');
  }
  return (
    <>
      <div className={`${isPopupDetails ? "overlay-adminDetails" : ""}`}>
        <div
          className={`box-popop-Details ${isPopupDetails ? "showPopup-Details" : "nonePopup-Details"
            }`}
          style={{ height: '96vh' }}
        >
          <div className="booking-details">
            <div className="detail-row">
              <span className="label">Mã đơn hàng</span>
              <span className="value">
                {/* {oneOderVehicle?.order?._id} */}
                {"BAG-" + oneOderVehicle?.order?._id?.slice(-5).toUpperCase()}
              </span>
            </div>
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
              <span className="value">02 phùng hưng</span>
            </div>

            <div className="detail-row">
              <span className="label">Tên xe</span>
              <span className="value">{carOne.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Ngày nhận và ngày trả</span>
              <span className="value">
                {formatDate(oneOderVehicle?.order?.pickUpDate)} -{" "}
                {formatDate(oneOderVehicle?.order?.returnDate)}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Số lượng xe</span>
              <span className="value">
                {oneOderVehicle?.order?.numberOfMotorcycles}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">
                {oneOderVehicle?.order?.task_status === "Đã hủy" ? "Hoàn biển số" : "Biển số xe"}
              </span>
              <span className="value">
                {oneOderVehicle?.order?.task_status === "Đã hủy"
                  ? oneOderVehicle?.order?.returnedLicensePlate.join(", ")
                  : oneOderVehicle?.order?.licensePlate.join(", ")}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Địa chỉ giao xe</span>
              <span className="value">
                {oneOderVehicle?.order?.shippingAddress}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Giá xe</span>
              <span className="value font-weight-bold">{formatCurrency(carOne.price)} <sup>đ</sup></span>
            </div>
            <div className="detail-row">
              <span className="label">Tổng tiền</span>
              <span className="value red text-danger font-weight-bold">
                {formatCurrency(oneOderVehicle?.order?.totalPrice)} <sup>đ</sup>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Số tiền đã thanh toán</span>
              <span className="value red text-success font-weight-bold">
                {formatCurrency(oneOderVehicle?.order?.amountPaid)} <sup>đ</sup>
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Bằng lái xe</span>
              <img
                src={oneOderVehicle?.order?.cardFront || ""}
                alt="Mặt trước"
                width="100"
                height="70"
                style={{ marginRight: "-295px" }}
                onClick={() =>
                  handleImageClick(oneOderVehicle?.order?.cardFront || "")
                }
                className="image-thumbnail"
              />
              <img
                src={oneOderVehicle?.order?.cardBack}
                alt="Mặt sau"
                width="100"
                height="70"
                onClick={() =>
                  handleImageClick(oneOderVehicle?.order?.cardBack || "")
                }
                className="image-thumbnail ms-5"
              />
              {isZoomed && zoomedImage && (
                <div className="zoomed-image-overlay" onClick={handleCloseZoom}>
                  <img
                    src={zoomedImage}
                    alt="Zoomed"
                    className="zoomed-image"
                  />
                </div>
              )}
            </div>
           
          </div>

          <div className="flex-btn-add mt-3">
            <input
              type="button"
              onClick={handleDetails}
              value="Đóng"
              className="btn btn-primary back"
              style={{ height: '6vh' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsOrderVehicle;
