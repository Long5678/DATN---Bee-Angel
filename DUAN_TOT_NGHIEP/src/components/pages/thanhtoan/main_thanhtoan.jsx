import React, { useState, useEffect } from "react";
import Header from "../../layouts/header";
import View_thanhtoan from "./view_thanhtoan";
import Paypal from "./paypal";
import "../../../publics/styles/detail_tour.scss";

function Main_thanhtoan() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);

  useEffect(() => {
    const price = localStorage.getItem("totalPrice");
    const deposit = localStorage.getItem("depositPrice");
    const paymentType = localStorage.getItem("paymentType");

    setTotalPrice(price ? parseInt(price) : 0);
    setDepositPrice(deposit ? parseInt(deposit) : 0);

    if (paymentType === "full") {
      setAmountToPay(price ? parseInt(price) : 0);
    } else if (paymentType === "deposit") {
      setAmountToPay(deposit ? parseInt(deposit) : 0);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="boxMain-detail-tour">
        <View_thanhtoan />
        <Paypal amount={amountToPay} />
      </div>
    </>
  );
}

export default Main_thanhtoan;
