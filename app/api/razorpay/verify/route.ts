// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const generateSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(razorpaySignature)
  );
};

export async function POST(request: NextRequest) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      userId,
      credits,
    } = await request.json();

    // Validate required fields
    if (
      !orderCreationId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !userId ||
      !credits
    ) {
      return NextResponse.json(
        { message: "Missing required fields", isOk: false },
        { status: 400 }
      );
    }

    // Verify the signature
    const isValid = generateSignature(
      orderCreationId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      console.error("Signature verification failed");
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    // Check if the user already has credits
    const { data: existingCredits, error: selectError } = await supabase
      .from("credits")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      throw selectError;
    }

    if (existingCredits) {
      // Update existing credits
      const { data: updateData, error: updateError } = await supabase
        .from("credits")
        .update({ credits: existingCredits.credits + credits })
        .eq("user_id", userId)
        .select();

      if (updateError) throw updateError;

      return NextResponse.json({
        message: "Payment verified and credits updated successfully",
        isOk: true,
        data: updateData,
      });
    } else {
      // Create new credits entry
      const { data: insertData, error: insertError } = await supabase
        .from("credits")
        .insert({ user_id: userId, credits: credits })
        .select();

      if (insertError) throw insertError;

      return NextResponse.json({
        message: "Payment verified and credits created successfully",
        isOk: true,
        data: insertData,
      });
    }
  } catch (error) {
    console.error("Error processing payment verification:", error);
    return NextResponse.json(
      {
        message: "Error processing payment verification",
        isOk: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
