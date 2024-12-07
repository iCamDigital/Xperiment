import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// Credit mapping - Using the correct env var names
const creditsPerPriceId: { [key: string]: number } = {
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ONE_CREDIT!]: Number(
    process.env.NEXT_PUBLIC_CREDIT_PACKAGE_ONE
  ),
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_THREE_CREDITS!]: Number(
    process.env.NEXT_PUBLIC_CREDIT_PACKAGE_TWO
  ),
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_FIVE_CREDITS!]: Number(
    process.env.NEXT_PUBLIC_CREDIT_PACKAGE_THREE
  ),
};

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    // Early return if no client_reference_id
    if (!session.client_reference_id) {
      console.log(
        "⚠️ No client_reference_id found in session, skipping credit update"
      );
      return true;
    }

    // Fetch line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const item = lineItems.data[0];

    if (!item?.price?.id) {
      console.log("⚠️ No price ID found in line items");
      return false;
    }

    // Debug logging
    console.log("Price ID from session:", item.price.id);
    console.log("Available price mappings:", creditsPerPriceId);

    const creditsPerUnit = creditsPerPriceId[item.price.id];
    if (!creditsPerUnit) {
      console.log(`⚠️ Unknown price ID: ${item.price.id}`);
      return false;
    }

    const totalCredits = creditsPerUnit * (item.quantity || 1);
    const userId = session.client_reference_id;

    console.log(`📦 Processing ${totalCredits} credits for user ${userId}`);

    // Update credits in database
    const { data: existingCredits, error: selectError } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Error fetching existing credits:", selectError);
      return false;
    }

    if (existingCredits) {
      const { error: updateError } = await supabase
        .from("credits")
        .update({ credits: existingCredits.credits + totalCredits })
        .eq("user_id", userId);

      if (updateError) {
        console.error("Error updating credits:", updateError);
        return false;
      }
    } else {
      const { error: insertError } = await supabase
        .from("credits")
        .insert({ user_id: userId, credits: totalCredits });

      if (insertError) {
        console.error("Error inserting credits:", insertError);
        return false;
      }
    }

    console.log(
      `✅ Successfully added ${totalCredits} credits for user ${userId}`
    );
    return true;
  } catch (error) {
    console.error("Error processing checkout session:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log(`📨 Received event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        const success = await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        if (!success) {
          return NextResponse.json(
            { error: "Failed to process checkout session" },
            { status: 500 }
          );
        }
        break;

      // Only acknowledge other events without processing them
      case "charge.succeeded":
      case "payment_intent.succeeded":
      case "payment_intent.created":
      case "charge.updated":
      case "product.created":
      case "price.created":
        console.log(`ℹ️ Acknowledged event ${event.type}`);
        break;

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
