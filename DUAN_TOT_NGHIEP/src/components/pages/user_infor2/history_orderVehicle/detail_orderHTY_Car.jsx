import { useContext } from "react";
import { PopupContext } from "../../../../context/popupContext";
import { useSelector } from "react-redux";

function Detail_orderHTY_Car() {
  const { isDetailOrderCar, setIsDetailOrderCar } = useContext(PopupContext);

  const oneOderVehicle = useSelector(
    (state) => state.orderVehicleSL.oneOderVehicle
  );

  const userOne = useSelector((state) => state.userSL.userOne);

  const carOne = useSelector((state) => state.carSL.carOne);

  function formatCurrency(value) {
    return Number(value).toLocaleString("vi-VN");
  }

  
  return (
    <>
      <div
        style={{ left: "0" }}
        className={`${isDetailOrderCar ? "overlay-admincardetails" : ""}`}
      >
        <div
          className={`box-popopcardetail ${
            isDetailOrderCar ? "showPopupCarDetails" : "nonePopup-car"
          }`}
        >
          <div className="detail-row">
            <span className="label">Mã đơn hàng</span>
            <span className="value"> {"TRX-"+oneOderVehicle?.order?._id?.slice(-5).toUpperCase()}</span>
          </div>
          <div className="detail-row">
            <span className="label">Tên xe</span>
            <span className="value">{carOne.name}</span>
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
            <span className="label">Số điện thoại</span>
            <span className="value">{userOne.phone}</span>
          </div>
          <div className="detail-row">
            <span className="label">Địa chỉ giao xe</span>
            <span className="value">
              {oneOderVehicle?.order?.shippingAddress}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Số lượng xe</span>
            <span className="value">
              {oneOderVehicle?.order?.numberOfMotorcycles}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Giá xe</span>
            <span className="value">{formatCurrency(carOne.price)} <sup>đ</sup></span>
          </div>
          <div className="detail-row">
            <span className="label">Trạng thái</span>
            <span className="value">{oneOderVehicle?.order?.task_status}</span>
          </div>
          <div className="detail-row">
            <span className="label">Tổng tiền</span>
            <span className="value text-danger">
              {formatCurrency(oneOderVehicle?.order?.totalPrice)} <sup>đ</sup>
            </span>
          </div>

         
          <button
            onClick={() => setIsDetailOrderCar(false)}
            className="btn btn-secondary mt-2"
            style={{ height: "6vh" }}
          >
            Đóng
          </button>
        </div>
      </div>
    </>
  );
}

export default Detail_orderHTY_Car;
