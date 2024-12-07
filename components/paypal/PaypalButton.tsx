//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface PayPalButtonProps {
  price: string;
  userId: string; // Add userId prop
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ price, userId }) => {
  const paypalRef = useRef<HTMLDivElement | null>(null);
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const addPayPalScript = () => {
    if (window.paypal) {
      setPaypalScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => setPaypalScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load PayPal script.");
      setError("Failed to load PayPal script.");
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    addPayPalScript();
  }, []);

  useEffect(() => {
    if (paypalScriptLoaded && paypalRef.current) {
      window.paypal
        .Buttons({
          fundingSource: window.paypal.FUNDING.PAYPAL,
          style: {
            color: "black",
            label: "pay",
            shape: "pill",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            setLoading(true);
            try {
              // Capture payment
              await actions.order.capture();
              // Notify your server using the correct API route
              await axios.post("/api/paypal", {
                orderId: data.orderID,
                payerId: userId, // Use the passed userId instead of PayPal's payerId
                amount: parseFloat(price), // Convert price to number
              });
              toast({
                title: "Payment Successful",
                description: "Credits are updated.",
                duration: 2000,
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000); // Delay of 2000 milliseconds (2 seconds)
            } catch (error) {
              console.error("Error during payment process:", error);
              setError("Payment failed. Please try again.");
            } finally {
              setLoading(false);
            }
          },
          onError: (err) => {
            console.error("PayPal Checkout error:", err);
            setError("Payment failed. Please try again.");
            setLoading(false);
          },
        })
        .render(paypalRef.current);
    }
  }, [paypalScriptLoaded, price, userId]);

  return (
    <div>
      <div ref={paypalRef} className="mt-8"></div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PayPalButton;
