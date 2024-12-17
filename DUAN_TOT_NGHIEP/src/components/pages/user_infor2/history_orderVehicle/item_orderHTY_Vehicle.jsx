import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../../../../context/popupContext";
import Detail_FasleCar from "./detail_fasleCar";
import { AuthContext } from "../../../../context/authContext";
import { useDispatch } from "react-redux";
import { getOneCar } from "../../../../redux/action_vehicle";
import { getoneOrderVehicle } from "../../../../redux/thunk/action_vehicleorder";
import axios from "axios";
import { useFindCar } from "../../../../hooks/findFetchCar";
import Detail_orderHTY_Car from "./detail_orderHTY_Car";

function Item_orderHTY_Vehicle({
  _id,
  idCar,
  pickUpDate,
  returnDate,
  status,
  task_status,
  numberOfMotorcycles,
  totalPrice,
  setActiveTab
}) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { isDetailOrderCar, setIsDetailOrderCar, setPopupTBCar, refundAmount, setRefundAmount } =
    useContext(PopupContext);
  const { recipientCar } = useFindCar(idCar)
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State để lưu ID đơn hàng đã chọn

  // useEffect(() => {
  //   if (user._id && user) {
  //     dispatch(getOneCar(idCar));
  //   }
  // }, [user._id, dispatch, idCar]);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getOneCar(idCar));
    }
  }, [user, dispatch, idCar]);

  const handlevieworder = () => {
    console.log("okok");

    setIsDetailOrderCar(true);
    dispatch(getoneOrderVehicle(_id));
    dispatch(getOneCar(idCar));

  };

  useEffect(() => {
    console.log("isPopupOrderVehicle", isDetailOrderCar);

  }, [isDetailOrderCar])

  function formatCurrency(value) {
    return Number(value).toLocaleString("vi-VN");
  }

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options); // Định dạng DD/MM/YYYY
  }

  const handleCancelCar = async () => {
    const totalAmountPaid = totalPrice;

    try {
      setSelectedOrderId(_id); // Lưu ID đơn hàng đã chọn

      const response = await axios.post(
        "http://localhost:3000/orderCar/sumOrder",
        {
          orderId: _id,
          totalAmountPaid,
          pickUpDate
        }
      );
      console.log("Response from API:", response.data);

      if (response.data.success) {
        setRefundAmount(response.data.refundAmount);
        setPopupTBCar(true); // Hiện popup sau khi tính toán thành công
      } else {
        console.error("Error calculating refund:", response.data.message);
      }
    } catch (error) {
      console.error("Error when calculating refund:", error);
    }
  };


  if (!recipientCar) {
    return
  }

  return (
    <>
      <div className="item_orderHTY">
        <div className="d-flex-content-orderHTY">
          <div className="img-orderHTY">
            <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/vehicles%2F${recipientCar?.images[0]}?alt=media`} alt={recipientCar?.name} className="tour-image" />
          </div>
          <div className="d-flex-name-count-orderHTY">
            <span className="name-tour-orderHTY">{recipientCar?.name}</span>
            <span className="people-orderHTY">
              Số lượng xe: {numberOfMotorcycles}
            </span>
            <span className="people-orderHTY">
              <b>Ngày nhận và Ngày trả:</b> {formatDate(pickUpDate)} →{" "}
              {formatDate(returnDate)}
            </span>
          </div>
          <div className="price-orderHTY" style={{ fontSize: '14px' }}>
            <div className="d-flex">
              Giá xe:
              <span style={{ marginTop: '0.2px' }} className="font-weight-bold">{formatCurrency(recipientCar?.price)} <sup>đ</sup></span>
            </div>
          </div>
        </div>
        <section className="status-totalPrice-orderHTY">
          <div className="totalPrice-orderHTY">
            Tổng tiền : <span>{formatCurrency(totalPrice)} <sup>đ</sup></span>
          </div>
          <div className="status-orderHTY">
            TT thanh toán : <span className={`status-label ${status === 'Hoàn thành' ? 'completed' : ''}`}>{status}</span>
          </div>
          <button onClick={handlevieworder} className="btn btn-primary ms-2">
            Chi tiết
          </button>
          {task_status == "Chờ xác nhận" &&
            <button
              onClick={handleCancelCar}
              className="btn btn-secondary ms-2"
            >
              Hủy xe
            </button>
          }
        </section>
      </div>
      {/* {refundAmount !== null && selectedOrderId === _id && ( */}
      <>
        <Detail_FasleCar
          orderId={_id}
          refundAmount={refundAmount} // Sử dụng giá trị refundAmount đã tính
          totalPrice={totalPrice} // Truyền giá trị totalPrice
          pickUpDate={pickUpDate}
          setActiveTab={setActiveTab}
        />
        <Detail_orderHTY_Car
          totalPrice={totalPrice}
          numberOfMotorcycles={numberOfMotorcycles}
        />
      </>
      {/* )} */}
    </>
  );
}

export default Item_orderHTY_Vehicle;
