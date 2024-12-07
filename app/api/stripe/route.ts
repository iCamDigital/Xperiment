export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Export the GET handler
export async function GET(req: NextRequest) {
  // Get the base URL of the app
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    // Extract the price ID and user ID from the query parameters
    const { searchParams } = new URL(req.url);
    const priceId = searchParams.get("priceId");
    const userId = searchParams.get("userId");

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const successUrl = `${baseUrl}/overview`;
    const cancelUrl = `${baseUrl}/overview`;

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ["card"],
      mode: "payment", // Use 'payment' for one-time payments
      billing_address_collection: "auto",
      client_reference_id: userId, // Add the user ID here
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
