import React, { useState, useEffect } from "react";
import Header from "../../layouts/header";
import View_thanhtoan from "./view_thanhtoan";
import Paypal from "./paypal";
import "../../../publics/styles/detail_tour.scss";

function Main_thanhtoan() {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy totalPrice từ localStorage khi trang thanh toán được tải
    const price = localStorage.getItem("totalPrice");
    setTotalPrice(price ? parseInt(price) : 0);
  }, []);

  return (
    <>
      <Header />
      <div className="boxMain-detail-tour">
        <View_thanhtoan />
        <Paypal amount={totalPrice} />
      </div>
    </>
  );
}

export default Main_thanhtoan;
