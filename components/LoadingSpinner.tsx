"use client";

import { Icons } from "@/components/icons";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Icons.spinner className="h-8 w-8 animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
