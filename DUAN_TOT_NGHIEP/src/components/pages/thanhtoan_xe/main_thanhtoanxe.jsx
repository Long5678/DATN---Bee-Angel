import React, { useState, useEffect } from "react";
import Header from "../../layouts/header";
import View_thanhtoanxe from "./view_thanhtoanxe";
import PaypalCar from "./paypal_car";
import "../../../publics/styles/detail_tour.scss";

const exchangeRate = 0.00003953;

function Main_thanhtoanxe() {
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
        <View_thanhtoanxe />
        <PaypalCar amount={(amountToPay * exchangeRate).toFixed(2)} />
      </div>
    </>
  );
}

export default Main_thanhtoanxe;
