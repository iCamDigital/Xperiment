import { NextResponse } from "next/server";
import axios from "axios";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Set dynamic route handling
export const dynamic = "force-dynamic";

// Environment Variables
const API_KEY = process.env.ASTRIA_API_KEY;
const QUERY_TYPE = process.env.PACK_QUERY_TYPE || "users"; // Default to 'users'
const DOMAIN = "https://api.astria.ai";

// Check if API Key is missing
if (!API_KEY) {
  throw new Error("MISSING API_KEY!");
}

export async function GET(request: Request) {
  try {
    // 1. First check if API key exists
    if (!API_KEY) {
      return NextResponse.json(
        { message: "API key not configured" },
        { status: 500 }
      );
    }

    // 2. Verify user authentication
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 3. Make API request with proper headers
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const endpoints = [];
    if (QUERY_TYPE === "users" || QUERY_TYPE === "both") {
      endpoints.push(`${DOMAIN}/packs`);
    }
    if (QUERY_TYPE === "gallery" || QUERY_TYPE === "both") {
      endpoints.push(`${DOMAIN}/gallery/packs`);
    }

    const responses = await Promise.all(
      endpoints.map((url) =>
        axios.get(url, {
          headers,
          validateStatus: (status) => status < 500, // Handle 4xx errors gracefully
        })
      )
    );

    const combinedData = responses.flatMap((response) => response.data);
    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error fetching packs:", error);

    // More detailed error handling
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json(
          { message: "Invalid API key or unauthorized access to Astria API" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { message: "Failed to fetch packs" },
      { status: 500 }
    );
  }
}
