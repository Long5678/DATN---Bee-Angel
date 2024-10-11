import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner, amount, idTour, numberOfPeople, numberOfChildren }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
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
                onApprove={(data, actions) => 
                    actions.order.capture().then(async (response) => {
                        console.log(response);
                        navigate(`/hoanthanh?id=${idTour}&people=${numberOfPeople}&children=${numberOfChildren}`);
                    })
                }
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
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
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
