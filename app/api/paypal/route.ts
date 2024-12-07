import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: Request) {
  try {
    const { orderId, payerId, amount } = await request.json();

    if (!orderId || !payerId || amount === undefined) {
      return NextResponse.json(
        { message: "Missing order details" },
        { status: 400 }
      );
    }

    // Determine credits based on the amount
    const creditsPurchased = determineCreditsFromAmount(amount);

    if (creditsPurchased === 0) {
      return NextResponse.json(
        { message: "Invalid amount for credits" },
        { status: 400 }
      );
    }

    // Check if the user already has credits
    const { data: existingCredits, error: selectError } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", payerId)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      throw selectError;
    }

    if (existingCredits) {
      // If the user has existing credits, update them
      const newCredits = existingCredits.credits + creditsPurchased;
      const { error: updateError } = await supabase
        .from("credits")
        .update({ credits: newCredits })
        .eq("user_id", payerId);

      if (updateError) throw updateError;
    } else {
      // If the user doesn't have credits, create a new row
      const { error: insertError } = await supabase
        .from("credits")
        .insert({ user_id: payerId, credits: creditsPurchased });

      if (insertError) throw insertError;
    }

    return NextResponse.json({
      message: "Credits updated successfully",
      creditsPurchased,
    });
  } catch (error) {
    console.error("PayPal webhook error:", error);
    return NextResponse.json(
      { message: "Error processing payment" },
      { status: 500 }
    );
  }
}

function determineCreditsFromAmount(amount: number): number {
  // Mapping amount to credits
  if (amount === 12) return parseInt(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_ONE || '0', 10);
  if (amount === 30) return parseInt(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_TWO || '0', 10);
  if (amount === 40) return parseInt(process.env.NEXT_PUBLIC_CREDIT_PACKAGE_THREE || '0', 10);
  return 0; // Default to 0 if no matching amount
}
