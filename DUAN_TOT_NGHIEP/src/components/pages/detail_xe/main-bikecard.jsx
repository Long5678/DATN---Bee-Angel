// Import the reusable bike card component
import "../../../publics/styles/detail-xe.scss"; // Your styling file
import "../../../publics/styles/listxe.scss";
import Item_Xe from "../listXe/item-Xe";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCar, getAllVehicle, getOneCar } from "../../../redux/action_vehicle";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../layouts/header";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
const MainBikeCard = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const idCar = searchParams.get("id");
  let dispatch = useDispatch();
  const { user, setOpen } = useContext(AuthContext);
  const dataCars = useSelector((state) => state.carSL.carDatas);
  const OneCar = useSelector((state) => state.carSL.carOne);
  useEffect(() => {
    dispatch(getAllCar());
  }, []);

  useEffect(() => {
    dispatch(getOneCar(idCar));
  }, [idCar]);

  function handleDatXe(e) {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
    navigation(`/formdatxe?id=${idCar}`);
  }

  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN');
  }

  return (
    <>
      <Header />
      <div className="vehicle-details-page">
        <div className="vehicle-details-container">
          {/* Hình ảnh xe */}
          <div className="vehicle-image-section">
            {OneCar.images && OneCar.images.length > 0 ? (
              // <img alt="xe" />
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/vehicles%2F${OneCar?.images[0]}?alt=media`}
                alt="Xe"
              />
            ) : (
              <span>ảnh lỗi</span>
            )}
          </div>

          {/* Thông tin chi tiết */}
          <div className="vehicle-info-section">
            <h1 className="vehicle-title-details">Chi tiết xe máy:</h1>
            <h2 className="vehicle-h2">Tên xe: {OneCar.name}</h2>
            {/* <p className=" justify-content-end">Hãng xe: {OneCar.motorcycleBrand}</p> */}
            <p className="vehicle-price">
              Với giá chỉ: <span>{formatCurrency(OneCar.price)} <sup>đ</sup></span>
            </p>
            <div className="vehicle-description">
              <p>
                <strong>Mô tả:</strong> {OneCar.description}
              </p>
            </div>

            {user ? (
              <button onClick={handleDatXe} className="rent-button">
                Đặt thuê xe
              </button>
            ) : (
              <button onClick={() => setOpen(true)} className="rent-button">Đặt thuê xe</button>
            )}

          </div>
        </div>
      </div>

      <div className="main-list-xe">
        <div className="box-list-xe">
          <div className="tieuDe-xe">
            <h2>Xem các mẫu xe khác</h2>
          </div>
          <div className="line-xe"></div>

          <div className="list-xe">
            {dataCars.map((item, index) => {
              return <Item_Xe key={index} {...item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBikeCard;
