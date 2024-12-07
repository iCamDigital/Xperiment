"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default function ModelsTable({ models }: ModelsTableProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/overview/models/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {models?.map((model) => (
        <Card
          key={model.modelId}
          onClick={() => handleRedirect(model.id)}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200 max-w-[300px]"
        >
          <CardHeader className="flex flex-col justify-center items-center pt-14">
            <h3 className="font-bold uppercase text-lg text-center mb-1">
              {model.name}
            </h3>
            <Badge
              className="flex gap-2 items-center"
              variant={model.status === "finished" ? "default" : "secondary"}
            >
              {model.status === "processing" ? "training" : model.status}
              {model.status === "processing" && (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              )}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-end space-y-2">
              <span className="mt-6 font-medium text-sm uppercase tracking-wide text-slate-600">
                {model.type}
              </span>
              <div className="flex gap-2 flex-wrap justify-end">
                {model.samples.slice(0, 3).map((sample) => (
                  <Avatar key={sample.id} className="h-12 w-12">
                    <AvatarImage src={sample.uri} className="object-cover" />
                  </Avatar>
                ))}
                {model.samples.length > 3 && (
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-muted">
                    <span className="text-sm font-medium">
                      +{model.samples.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
