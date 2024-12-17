import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { enterEmailClient, enterEmailClientHT, updateBookingCount } from '../../../redux/action_thunk';
import axios from "axios";
import { newOrder } from "../../../redux/order_slice";

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner, amount, idTour, numberOfPeople, numberOfChildren, departureDate, returnDate }) => {

    console.log(numberOfChildren, departureDate, returnDate);

    const [{ isPending, options }, paypalDispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const userEmail = useSelector(state => state.user?.email);
    const task_status = "Chờ xác nhận";


    useEffect(() => {
        paypalDispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency
            }
        });
    }, [currency, showSpinner]);

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order.create({
                        purchase_units: [{ amount: { currency_code: currency, value: amount } }]
                    }).then(orderId => orderId)}
                onApprove={async (data, actions) => {
                    const response = await actions.order.capture();
                    console.log(response);

                    const idUser = user._id;

                    const exchangeRate = 25297.5;

                    const paidAmountInUSD = parseFloat(response.purchase_units[0].amount.value);
                    const paidAmount = Math.round(paidAmountInUSD * exchangeRate); // Chỉ làm tròn một lần
                    console.log("tiền thanh toán ", paidAmount);
                    

                    const sale = parseFloat(localStorage.getItem("sale"));
                    const depositPrice = parseFloat(localStorage.getItem("depositPrice"));
                    const totalPrice = parseFloat(localStorage.getItem("totalPrice"));
                    const priceHotel = parseFloat(localStorage.getItem("priceHotel"));
                    const namehotel = localStorage.getItem("namehotel");
                    const locationhotel = localStorage.getItem("locationhotel");

                    const mustPay = (sale + priceHotel) - (depositPrice + priceHotel); // đámg lẽ phải trừ với giá thực tế paidAmount nhưng để fix số âm thì trừ với depositPrice
                    const totalToPay = Math.round(sale + priceHotel); // Làm tròn tổng chi phí
                    const depositToPay = Math.round(depositPrice + priceHotel); // Làm tròn tiền đặt cọc


                    const tolerance = 1000; // Độ chênh lệch cho phép
                    const status = (Math.abs(paidAmount - totalToPay) <= tolerance) ? 'Hoàn thành' : (Math.abs(paidAmount - depositToPay) <= tolerance ? 'Đặt cọc' : 'Unknown');

                    const sendEmail = async (idOrder) => {
                        const emailToSend = userEmail || user?.email;
                        const id = idOrder
                        if (emailToSend) {
                            if (status === 'Hoàn thành') {
                                await dispatch(enterEmailClientHT(emailToSend, id));
                            } else if (status === 'Đặt cọc') {
                                await dispatch(enterEmailClient(emailToSend, id));
                            }
                        }
                    };

                    try {
                        let res = await axios.post('http://localhost:3000/Order/add', {
                            idTour,
                            idUser,
                            numberOfPeople,
                            numberOfChildren,
                            status,
                            amountPaid: paidAmount,
                            mustPay,
                            priceHotel,
                            namehotel,
                            locationhotel,
                            sale,
                            depositPrice,
                            totalPrice,
                            departureDate,
                            returnDate,
                            task_status,
                            paymentMethod: 'Paypal'
                        });
                        dispatch(newOrder(res.data.newOrder));
                        dispatch(updateBookingCount(idTour))
                        console.log('Đơn hàng đã được tạo thành công');
                        let idOrder = res.data.newOrder._id

                        await sendEmail(idOrder);

                        navigate(`/hoanthanh?id=${idOrder}&people=${numberOfPeople}&children=${numberOfChildren}&departureDate=${departureDate}&returnDate=${returnDate}`);

                    } catch (error) {
                        navigate('/error')
                    }


                }}
            />
        </>
    );
};


export default function Paypal({ amount }) {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id");
    const numberOfPeople = searchParams.get("people");
    const numberOfChildren = searchParams.get("children");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");

    return (
        <div style={{ maxWidth: "750px", }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD", "disable-funding": "card" }}>
                <ButtonWrapper
                    currency={'USD'}
                    amount={amount}
                    showSpinner={false}
                    idTour={idTour}
                    numberOfPeople={numberOfPeople}
                    numberOfChildren={numberOfChildren}
                    departureDate={departureDate}
                    returnDate={returnDate}
                />
            </PayPalScriptProvider>
        </div>
    );
}
