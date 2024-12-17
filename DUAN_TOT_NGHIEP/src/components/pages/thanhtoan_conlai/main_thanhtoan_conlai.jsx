import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layouts/header";
import View_thanhtoan from "./view_thanhtoan";
import Paypal from "./paypal";
import { getoneOder } from "../../../redux/action_thunk";
import { useSearchParams } from "react-router-dom";
import "../../../publics/styles/detail_tour.scss";
import { PopupContext } from "../../../context/popupContext";

const exchangeRate = 0.00003953; // 1000 VND trên 0.00003953 USD

function Main_thanhtoan_conlai() {
  let dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [depositPrice, setDepositPrice] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const [searchParams] = useSearchParams();
  const idOrder = searchParams.get("id");
  const { setidOrder} = useContext(PopupContext)
  setidOrder(idOrder)
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
  }, [setidOrder]);

  useEffect(() => {
    dispatch(getoneOder(idOrder));
  }, [idOrder, dispatch]);

  const oneOder = useSelector((state) => state.oderSL.oneOder);

  return (
    <>
      <Header />
      <div className="boxMain-detail-tour">
        
        {
    oneOder.status === "Đặt cọc" && oneOder.task_status !== "Đã hủy" ? (
      <>
      <View_thanhtoan/>
      <Paypal amount={parseFloat((amountToPay * exchangeRate).toFixed(2))} />
      </>
    ) : (
        <p>Tour đã thanh toán hoặc đã được hủy !</p>
    )
}
      </div>
    </>
  );
}

export default Main_thanhtoan_conlai;