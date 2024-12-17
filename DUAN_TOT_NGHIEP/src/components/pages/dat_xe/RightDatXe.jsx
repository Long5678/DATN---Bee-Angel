import "../../../publics/styles/datxe.scss";
import { useSearchParams } from "react-router-dom";
import SimpleMap from "./celander";
import { useDispatch, useSelector } from "react-redux";
import { getOneCar } from "../../../redux/action_vehicle";
import { useEffect } from "react";
function RightDatXe() {
  const [searchParams] = useSearchParams();
  const idCar = searchParams.get("id");
  let dispatch = useDispatch();
  const OneCar = useSelector((state) => state.carSL.carOne);

  const priceNumber = Number(OneCar.price);
  const formatPrice = priceNumber.toLocaleString("vi-VN");

  useEffect(() => {
    dispatch(getOneCar(idCar));
  }, [idCar]);

  console.log(OneCar);

  return (
    <>
      <div className="div-box-xeDetail-right">
        <div className="xe-details-card">
          <div className="xe-image-details">
            {OneCar.images && OneCar.images.length > 0 ? (
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/vehicles%2F${OneCar?.images[0]}?alt=media`}
                alt="xe"
                className="bike-image"
              />
            ) : (
              <span>Lỗi ảnh</span>
            )}
          </div>
          <div className="xe-info">
            <div className="xe-header">
              <div className="xe-rating">
                <i className="fa-solid fa-star"></i>
                <span>5.0</span>
              </div>
            </div>
            <h3>{OneCar.name}</h3>
            <p className="p_xeInfo">{OneCar.description}</p>
            <div className="xe-price-thanhToan">
              <span className="price-name">Price</span>
              <span className="price-amount">{formatPrice} <sup>đ</sup></span>
              {/* <span className="price-currency">VDN</span> */}
            </div>
          </div>
        </div>

        <SimpleMap />
      </div>
    </>
  );
}

export default RightDatXe;
