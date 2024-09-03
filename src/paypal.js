
import { useEffect, useRef } from "react";

const PayPalButton = ({ onRequestURL, onCancelURL, onApproveURL }) => {
    const paypal = useRef(null);

    useEffect(() => {
        if (!window.paypal) return;

        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: "hello",
                        amount: {
                            currency_code: "USD",
                            value: "0.01"  
                        }
                    }]
                });
            },
            onApprove: async (data, actions) => {
                try {
                    const order = await actions.order.capture();
                    console.log("Successful order", order);

                    if (onApproveURL) {
                        onApproveURL(order);
                    }

                } catch (err) {
                    console.error("Error capturing order", err);
                }
            },
            onError: (err) => {
                console.error("Error with PayPal buttons", err);
            },
            onShippingChange: (data, actions) => {
                if (onRequestURL) {
                    onRequestURL(data);
                }
            },
            onCancel: (data) => {
                console.log("Payment cancelled", data);
                if (onCancelURL) {
                    onCancelURL(data);
                }
            }
        }).render(paypal.current);

    }, [onRequestURL, onCancelURL, onApproveURL]);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
};

export default PayPalButton;
