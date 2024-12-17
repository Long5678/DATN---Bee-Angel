import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import { enterEmailClientHC } from "../../../redux/action_thunk";
import { useSelector, useDispatch } from "react-redux";
import { newOrderCar } from "../../../redux/ordervehicle_slice";

const style = { layout: "vertical" };

const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  idCar,
  numberOfMotorcycles,
  licensePlate,
  pickUpDate,
  returnDate,
  shippingAddress,
}) => {
  const [{ isPending, options }, paypalDispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const task_status = "Chờ xác nhận";

  useEffect(() => {
    paypalDispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  let cardFront = JSON.parse(localStorage.getItem("fileFrontCar"));
  let cardBack = JSON.parse(localStorage.getItem("fileBackCar"));

  

  const dispatch = useDispatch();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={async (data, actions) => {
          const response = await actions.order.capture();
          console.log(response);

          const idUser = user._id;
          const totalPrice = parseFloat(localStorage.getItem("totalPrice"));
          // const licensePlate = parseFloat(localStorage.getItem("licensePlate"))
          // const amountPaid = parseFloat(response.purchase_units[0].amount.value);
          // const status = amountPaid === totalPrice ? "Hoàn thành" : "Unknow";
          const exchangeRate = 25297.5;

          const paidAmountInUSD = parseFloat(response.purchase_units[0].amount.value);
          const paidAmount = Math.round(paidAmountInUSD * exchangeRate); // Chỉ làm tròn một lần

          const tolerance = 1000; // Độ chênh lệch cho phép
          const status = (Math.abs(paidAmount - totalPrice) <= tolerance) ? 'Hoàn thành' : 'Unknown';

          const numberOfMotorcyclesInt = parseInt(numberOfMotorcycles, 10);


          const sendEmail = async (idOrder) => {
            const emailToSend = user?.email;
            const id = idOrder;
            dispatch(enterEmailClientHC(emailToSend, id));
          };


          // let licensePlates= licensePlate;
          try {
            const response = await axios.post(
              "http://localhost:3000/orderCar/add",
              {
                idCar,
                idUser,
                numberOfMotorcycles: numberOfMotorcyclesInt,
                pickUpDate,
                returnDate,
                status,
                task_status,
                amountPaid: paidAmount,
                shippingAddress,
                totalPrice,
                cardFront,
                cardBack,
                licensePlate,
                 paymentMethod: 'Paypal'
              }
            );

            dispatch(newOrderCar(response.data.newOrder))

            let idOrder = response.data.newOrder._id;
            await sendEmail(idOrder);
            console.log("Đơn hàng đã được tạo thành công", response.data);
          } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error.response ? error.response.data : error.message);
          }

          navigate(`/hoanthanhxe?id=${idCar}&carnumber=${numberOfMotorcycles}`);
        }}
      />
    </>
  );
};

export default function PaypalCar({ amount }) {
  const [searchParams] = useSearchParams();
  const idCar = searchParams.get("id");
  const numberOfMotorcycles = searchParams.get("carnumber");
  const pickUpDate = searchParams.get("pickupdate");
  const returnDate = searchParams.get("returndate");
  const shippingAddress = searchParams.get("shippingaddress");

  const licensePlate = JSON.parse(localStorage.getItem("licensePlate"));


  return (
    <div style={{ maxWidth: "750px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD", "disable-funding": "card" }}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          idCar={idCar}
          numberOfMotorcycles={numberOfMotorcycles}
          pickUpDate={pickUpDate}
          returnDate={returnDate}
          shippingAddress={shippingAddress}
          licensePlate={licensePlate}
        />
      </PayPalScriptProvider>
    </div>
  );
}
