import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency } = (await request.json()) as {
      amount: number;
      currency: string;
    };

    // Convert amount to smallest currency unit
    const amountInSmallestUnit = Math.round(amount * 100);

    // Ensure minimum amount requirement is met (minimum 100 cents = 1 USD)
    if (amountInSmallestUnit < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 1 USD" },
        { status: 400 }
      );
    }

    const options = {
      amount: amountInSmallestUnit,
      currency: currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
