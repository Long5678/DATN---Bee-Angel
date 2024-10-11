// import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const style = { layout: "vertical" };

// const ButtonWrapper = ({ currency, showSpinner, amount }) => {
//     const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
//     const navigate = useNavigate(); // Initialize navigate

//     useEffect(() => {
//         dispatch({
//             type: 'resetOptions',
//             value: {
//                 ...options,
//                 currency: currency
//             }
//         });
//     }, [currency, showSpinner]);

//     return (
//         <>
//             {showSpinner && isPending && <div className="spinner" />}
//             <PayPalButtons
//                 style={style}
//                 disabled={false}
//                 forceReRender={[style, currency, amount]}
//                 fundingSource={undefined}
//                 createOrder={(data, actions) => 
//                     actions.order.create({
//                         purchase_units: [{ amount: { currency_code: currency, value: amount } }]
//                     }).then(orderId => orderId)}
//                 onApprove={(data, actions) => actions.order.capture().then(async (response) => {
//                     console.log(response);
//                     navigate(`/hoanthanh?id=${idTour}&people=${numberOfPeople}&children=${numberOfChildren}`); // Redirect to success page after successful payment
//                 })}
//             />
//         </>
//     );
// };

// export default function Paypal({ amount }) {
//     return (
//         <div style={{ maxWidth: "750px", minHeight: "200px" }}>
//             <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
//                 <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
//             </PayPalScriptProvider>
//         </div>
//     );
// }

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useNavigate and useSearchParams

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner, amount, idTour, numberOfPeople, numberOfChildren }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate(); // Initialize navigate

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
                        // Ensure idTour, numberOfPeople, and numberOfChildren are available
                        navigate(`/hoanthanh?id=${idTour}&people=${numberOfPeople}&children=${numberOfChildren}`); // Redirect to success page after successful payment
                    })
                }
            />
        </>
    );
};

export default function Paypal({ amount }) {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // Retrieve idTour from URL params
    const numberOfPeople = searchParams.get("people"); // Retrieve numberOfPeople from URL params
    const numberOfChildren = searchParams.get("children"); // Retrieve numberOfChildren from URL params

    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper 
                    currency={'USD'} 
                    amount={amount} 
                    showSpinner={false} 
                    idTour={idTour} // Pass idTour as a prop
                    numberOfPeople={numberOfPeople} // Pass numberOfPeople as a prop
                    numberOfChildren={numberOfChildren} // Pass numberOfChildren as a prop
                />
            </PayPalScriptProvider>
        </div>
    );
}
