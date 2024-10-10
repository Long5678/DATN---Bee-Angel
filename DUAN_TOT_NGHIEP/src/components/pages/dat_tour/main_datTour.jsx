import React from 'react';
import TourForm from "./TourForm";
import TourDetail from "./TourDetail";
import Header from "../../layouts/header";
import Banner from "../home/banner";

function Main_datTour() {
  const token = localStorage.getItem('token'); // Kiểm tra token

  if (!token) {
    return (
      <div>
        <h2>Vui lòng đăng nhập để tiếp tục.</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="tour-main-title">
        <div className='tour-title'>
          <h1>Đặt Vé Ngay</h1>
          <p>Khách hàng rất quan trọng</p>
        </div>
        <div className="main-content">
          <TourForm />
          <TourDetail />
        </div>
      </div>
    </>
  );
}

export default Main_datTour;
