//@ts-nocheck
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Add this
import { Icons } from "@/components/icons";
import ClientSideModel from "@/app/overview/components/realtime/ClientSideModel";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this

export default function ModelPageClient({ model, images, samples }) {
  const router = useRouter();

  return (
    <div id="train-model-container" className="w-full h-full p-5 relative">
      <Button
        variant="default"
        size="sm"
        onClick={() => router.back()}
        className="absolute left-5 top-5"
      >
        ← Back
      </Button>

      <div className="flex flex-row justify-center items-center gap-2 pb-4">
        <h1 className="text-5xl font-extrabold uppercase tracking-wide">
          {model.name}
        </h1>
        <Badge
          variant={model.status === "finished" ? "default" : "default"}
          className="text-xs mb-6 p-[2px] rounded-full"
        >
          {model.status === "finished" ? (
            <CheckIcon className="h-3 w-3 stroke-[3]" />
          ) : (
            <Icons.spinner className="h-3 w-3 animate-spin stroke-[3]" />
          )}
        </Badge>
      </div>

      <ClientSideModel
        samples={samples}
        serverModel={model}
        serverImages={images}
      />
    </div>
  );
}
