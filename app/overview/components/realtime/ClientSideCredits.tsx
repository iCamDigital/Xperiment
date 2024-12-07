"use client";

import { Database } from "@/types/supabase";
import { creditsRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const revalidate = 0;

type ClientSideCreditsProps = {
  creditsRow: creditsRow | null;
};

export default function ClientSideCredits({
  creditsRow,
}: ClientSideCreditsProps) {
  const router = useRouter();
  if (!creditsRow) return null;

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [credits, setCredits] = useState<creditsRow>(creditsRow);

  useEffect(() => {
    const channel = supabase
      .channel("realtime credits")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "credits" },
        (payload: { new: creditsRow }) => {
          setCredits(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, credits, setCredits]);

  const getRemainingPercentage = () => {
    if (!credits) return 0;
    // Using the actual credits value directly as percentage
    // As credits decrease, the bar will shrink
    return Math.max(credits.credits * 20, 0); // Multiply by 20 to make the scale more visible
  };

  if (!credits) return null;

  return (
    <div className="w-full max-w-sm">
      <div className="bg-primary p-4 rounded-lg text-primary-foreground">
        <h2 className="font-medium text-base">Usage</h2>
        <div className="h-2 bg-primary-foreground/20 w-full rounded-full mt-3 overflow-hidden">
          <div
            className="h-2 bg-primary-foreground rounded-full transition-all duration-700"
            style={{
              width: `${getRemainingPercentage()}%`,
            }}
          ></div>
        </div>
        <p className="text-sm font-normal mt-2">
          Credits: {credits.credits} remaining
        </p>
      </div>
      <Button
        variant="secondary"
        className="w-full mt-3"
        onClick={() => router.push("/overview/credits")}
      >
        Get More Credits
      </Button>
    </div>
  );
}
