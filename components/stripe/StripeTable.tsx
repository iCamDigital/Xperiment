// @ts-nocheck
"use client";
import { User } from "@supabase/supabase-js";
import { Loader2Icon } from "lucide-react";
import PayPalButton from "../paypal/PaypalButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";

type Props = {
  user: User;
};

type PlanType = "oneCredit" | "threeCredits" | "fiveCredits";

type PlanDetails = {
  title: string;
  price: number;
  credits: number;
  images: number;
  models: number;
  stripePriceId: string;
};

const plans: { [key in PlanType]: PlanDetails } = {
  oneCredit: {
    title: "1 Credit",
    price: Number(process.env.NEXT_PUBLIC_PRICE_ONE_CREDIT),
    credits: Number(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_ONE),
    images: 16,
    models: 1,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ONE_CREDIT!,
  },
  threeCredits: {
    title: "3 Credits",
    price: Number(process.env.NEXT_PUBLIC_PRICE_THREE_CREDITS),
    credits: Number(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_TWO),
    images: 48,
    models: 3,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_THREE_CREDITS!,
  },
  fiveCredits: {
    title: "5 Credits",
    price: Number(process.env.NEXT_PUBLIC_PRICE_FIVE_CREDITS),
    credits: Number(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_THREE),
    images: 80,
    models: 5,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_FIVE_CREDITS!,
  },
};

const PaymentDialog = ({
  plan,
  onStripeClick,
  onRazorpayClick,
  loading,
  paypalScriptLoaded,
  userId,
}: {
  plan: PlanDetails;
  onStripeClick: () => void;
  onRazorpayClick: () => void;
  loading: boolean;
  paypalScriptLoaded: boolean;
  userId: string;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="mt-8 w-full rounded-full transition-all cursor-pointer px-12 py-3 text-center text-sm font-medium border-none bg-primary text-white hover:bg-primary/80 focus:outline-none">
        <span className="flex items-center justify-center gap-2">
          <CreditCard className="w-5 h-5" />
          Buy Now
        </span>
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Choose Payment Method</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3 mt-4">
        {/* <button
          onClick={onStripeClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-full p-3 bg-[#635BFF] hover:bg-[#635BFF]/90 text-white transition-all"
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <>Pay with  Stripe</>
          )}
        </button>  */}

        {paypalScriptLoaded && (
          <PayPalButton price={plan.price.toString()} userId={userId} />
        )}

        <button
          onClick={onRazorpayClick}
          className="flex items-center justify-center mt-6 gap-2 w-full rounded-full p-3 bg-[#2D87F3] hover:bg-[#2D87F3]/90 text-white transition-all"
        >
          Pay with Razorpay
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

const StripePricingTable = ({ user }: Props) => {
  // Loading states
  const [scriptLoading, setScriptLoading] = useState<{
    [key in PlanType]: boolean;
  }>({
    oneCredit: false,
    threeCredits: false,
    fiveCredits: false,
  });
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);
  const { toast } = useToast();

  // Stripe payment handling
  const handleStripePayment = async (plan: PlanType) => {
    setScriptLoading((prev) => ({ ...prev, [plan]: true }));

    try {
      const response = await axios.get(
        `/api/stripe?priceId=${plans[plan].stripePriceId}&userId=${user.id}`
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      alert("Failed to initiate Stripe payment. Please try again.");
    } finally {
      setScriptLoading((prev) => ({ ...prev, [plan]: false }));
    }
  };

  // PayPal script loading
  const loadPayPalScript = () => {
    if (window.paypal) {
      setPaypalScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
    script.async = true;
    script.onload = () => setPaypalScriptLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadPayPalScript();
  }, []);

  // Razorpay payment handling
  const createRazorpayOrder = async (planKey: PlanType) => {
    try {
      const plan = plans[planKey];
      const response = await axios.post("/api/razorpay/order", {
        amount: plan.price, // Remove the *100 here since it's handled in the API
        currency: "USD",
      });
      return response.data;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return null;
    }
  };

  const handleRazorpayPayment = async (planKey: PlanType) => {
    try {
      const orderData = await createRazorpayOrder(planKey);
      if (!orderData?.orderId) {
        alert("Failed to create payment order. Please try again.");
        return;
      }

      const plan = plans[planKey];

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: plan.price * 100, // Keep this conversion here
        currency: "USD",
        name: "Framecast AI",
        description: `Purchase ${plan.credits} Credits`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            console.log("Payment response:", response); // Debug log

            const verificationResponse = await axios.post(
              "/api/razorpay/verify",
              {
                orderCreationId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                amount: plan.price,
                userId: user.id,
                credits: plan.credits,
              }
            );

            console.log("Verification response:", verificationResponse); // Debug log

            if (verificationResponse.data.isOk) {
              toast({
                title: "Payment Successful",
                description: "Credits are updated.",
                duration: 2000,
              });

              setTimeout(() => {
                window.location.reload();
              }, 2000); // Delay of 2000 milliseconds (2 seconds)
            } else {
              throw new Error(
                verificationResponse.data.message || "Verification failed"
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.user_metadata?.full_name || "",
          email: user.email,
        },
        theme: {
          color: "#6861ff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        alert(
          response.error.description || "Payment failed. Please try again."
        );
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error handling Razorpay payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <h2 className="text-4xl font-bold text-center mt-8 mb-8">
        Buy More Credits
      </h2>

      <div className="px-4 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
        {Object.keys(plans).map((planKey) => {
          const plan = plans[planKey as PlanType];
          return (
            <Card
              key={planKey}
              className="rounded-2xl bg-white border border-gray-200 shadow-sm"
            >
              <CardHeader className="text-center p-6 sm:px-8 lg:p-12">
                <CardTitle className="text-lg font-medium text-gray-900">
                  {plan.title}
                </CardTitle>
                <div className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    ${plan.price}
                  </strong>
                  <span className="text-sm font-medium text-gray-700">
                    {" "}
                    /credits
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:px-8 lg:p-12">
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {plan.images} Headshot Images
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {plan.models} Model(s) Included
                    </span>
                  </li>
                </ul>

                <PaymentDialog
                  plan={plan}
                  onStripeClick={() => handleStripePayment(planKey as PlanType)}
                  onRazorpayClick={() =>
                    handleRazorpayPayment(planKey as PlanType)
                  }
                  loading={scriptLoading[planKey as PlanType]}
                  paypalScriptLoaded={paypalScriptLoaded}
                  userId={user.id}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default StripePricingTable;
