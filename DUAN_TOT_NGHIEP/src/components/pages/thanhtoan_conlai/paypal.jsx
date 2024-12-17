import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { enterEmailClientHT } from '../../../redux/action_thunk';
import axios from "axios";
import { PopupContext } from "../../../context/popupContext";

const style = { layout: "vertical" };


const ButtonWrapper = ({ currency, showSpinner, amount, idTour, numberOfPeople, numberOfChildren }) => {
    const [{ isPending, options }, paypalDispatch] = usePayPalScriptReducer();
    const {idOrder} = useContext(PopupContext)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const userEmail = useSelector(state => state.user?.email);

    console.log("okokoook",idOrder);
    

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

                    const exchangeRate = 25299;

                    const paidAmountInUSD = parseFloat(response.purchase_units[0].amount.value);
                    const paidAmount = Math.round(paidAmountInUSD * exchangeRate); // Chỉ làm tròn một lần

                    const sendEmail = async (idOrder) => {
                        const emailToSend = userEmail || user?.email;
                        const id = idOrder
                                await dispatch(enterEmailClientHT(emailToSend,id));
                    };

                    try {
                        await axios.post('http://localhost:3000/Order/hoanthanh', {
                                idOrder , paidAmount
                            });
                        
                        
                        console.log('Đơn hàng đã được tạo thành công')
                        await sendEmail(idOrder);
                    } catch (error) {
                       navigate('/error')
                    }

                    navigate(`/hoanthanhCL?id=${idOrder}`);
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

    return (
        <div style={{ maxWidth: "750px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD", "disable-funding": "card" }}>
                <ButtonWrapper 
                    currency={'USD'} 
                    amount={amount} 
                    showSpinner={false} 
                    idTour={idTour}
                    numberOfPeople={numberOfPeople}
                    numberOfChildren={numberOfChildren}
                />
            </PayPalScriptProvider>
        </div>
    );
}
