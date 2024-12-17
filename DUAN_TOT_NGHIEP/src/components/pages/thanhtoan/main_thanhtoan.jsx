import { useState, useEffect } from "react";
import Header from "../../layouts/header";
import View_thanhtoan from "./view_thanhtoan";
import Paypal from "./paypal";
import "../../../publics/styles/detail_tour.scss";
import "../../../publics/styles/reponsive/rp-bookTour.scss"

const exchangeRate = 0.00003953; // 1000 VND trên 0.00003953 USD

function Main_thanhtoan() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const priceHotel = parseFloat(localStorage.getItem("priceHotel"));

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
        <Paypal amount={parseFloat(((amountToPay + priceHotel) * exchangeRate).toFixed(2))} />
      </div>
    </>
  );
}

export default Main_thanhtoan;