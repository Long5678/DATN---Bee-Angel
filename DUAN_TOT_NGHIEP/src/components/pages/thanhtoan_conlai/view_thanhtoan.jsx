import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import "../../../publics/styles/thanhtoan.scss";
import { getoneOder } from "../../../redux/action_thunk";
import { useFindUserComment } from "../../../hooks/usefindusercomment";
import { useFindTour } from "../../../hooks/findTourFetch";
import { PopupContext } from "../../../context/popupContext";

function ViewThanhtoan() {
  const { idOrder } = useContext(PopupContext);
  let dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  useEffect(() => {
    dispatch(getoneOder(idOrder));
  }, [idOrder, dispatch, setAlreadyPaid]);

  const oneOder = useSelector((state) => state.oderSL.oneOder);

  const { recipientUser } = useFindUserComment(oneOder?.idUser);
  const { recipientTour } = useFindTour(oneOder?.idTour);

  useEffect(() => {
    if (oneOder?.status === "Hoàn thành") {
      setAlreadyPaid(true);
    }
  }, [oneOder]);

  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN') + '₫';
  }

  if (alreadyPaid) {
    return <div className="payment-message">Bạn đã thanh toán rồi.</div>;
  }

  return (
    <div className="tour-form-container1">
      <div className="tour-form">
        <h2>Xác nhận thông tin</h2>
        {recipientUser && (
          <form>
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" value={recipientUser.name} readOnly />
            </div>
            <div className="form-group-wrapper">
              <div className="form-group">
                <label>Ngày sinh</label>
                <input type="date" value={recipientUser.birth_day} readOnly />
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <input type="text" value={recipientUser.gender} readOnly />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={recipientUser.email} readOnly />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" value={recipientUser.phone} readOnly />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input type="text" value={recipientUser.address} readOnly />
            </div>
            <div className="form-group">
              <label>Địa chỉ đón</label>
              <input type="text" value={recipientUser.address_don} readOnly />
            </div>
          </form>
        )}
      </div>
      {recipientTour && (
        <div className="price-forms">
          <div className="price-form">
            <h4>{recipientTour.name}</h4>
            <span>{recipientTour.description}</span>

            <hr />
            <div className="form-title">
              <p>Ngày khởi hành: </p>
              <span className="px-2">01/11/2024</span>
            </div>
            <div className="form-title">
              <p>Số lượng: </p>
              <span className="px-2">{oneOder.numberOfPeople} Người lớn + {oneOder.numberOfChildren} Trẻ em</span>
            </div>
            <hr />
            <div className="form-title">
              <p className="title-bold">Giá gốc: </p>
              <span className="title-red px-2">{formatCurrency(oneOder.totalPrice)}</span>
            </div>
          </div>
          <div className="price-form mt-4">
            <div className="form-title">
              <p>Giảm giá ưu đãi:</p>
              <span className="title-blue px-2">giảm 10%</span>
            </div>
            <div className="form-title">
              <p>Giá tour đã giảm:</p>
              <span className="px-2">{formatCurrency(oneOder.sale)}</span>
            </div>
            {oneOder.priceHotel !== 0 && (
              <>
                <div className="form-title">
                  <p>Tiền Khách sạn:</p>
                  <span className="px-2">{formatCurrency(oneOder.priceHotel)}</span>
                </div>
              </>
            )}
            {/* {localStorage.getItem("paymentType") !== "full" && ( */}
                <div className="form-title">
                <p>Tiền đặt cọc:</p>
                <span className="px-2">{formatCurrency(oneOder.depositPrice)}</span>
              </div>
            {/* )} */}
            
            <div className="form-title">
              <p className="title-bold">Số tiền đã thanh toán:</p>
              <span className="title-red px-2">
                {formatCurrency((oneOder.sale - oneOder.depositPrice) + oneOder.priceHotel)}
              </span>
            </div>
            {/* {localStorage.getItem("paymentType") !== "full" && ( */}
                <div className="form-title">
                <p className="title-bold">Còn lại phải thanh toán:</p>
                <span className="title-red px-2">
                  {formatCurrency(oneOder.sale - oneOder.depositPrice)}
                </span>
              </div>
            {/* )} */}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewThanhtoan;
