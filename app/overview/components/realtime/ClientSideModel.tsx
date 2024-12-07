//@ts-nocheck
"use client";

import React, { useState } from "react";
import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function ClientSideModel({
  serverModel,
  serverImages,
  samples,
}: ClientSideModelProps) {
  const [model, setModel] = useState<modelRow>(serverModel);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div id="train-model-container" className="w-full pb-5">
      <div className="flex flex-col w-full mt-4 space-y-8">
        {/* Training Data Section */}
        <div className="w-full mb-10">
          <h2 className="text-3xl mb-4 font-medium tracking-wide">
            Your Images
          </h2>
          <div className="flex items-center gap-2">
            {samples.slice(0, 3).map((sample, index) => (
              <Dialog key={sample.id}>
                <DialogTrigger asChild>
                  <Avatar className="h-16 w-16 cursor-pointer hover:opacity-80">
                    <AvatarImage
                      src={sample.uri}
                      alt={`Training sample ${index + 1}`}
                      className="object-cover"
                    />
                  </Avatar>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <img
                    src={sample.uri}
                    alt={`Training sample ${index + 1}`}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
            ))}
            {samples.length > 3 && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-16 w-16 rounded-full bg-primary shadow-md flex items-center justify-center cursor-pointer hover:opacity-80">
                    <span className="text-base font-medium text-white">
                      +{samples.length - 3}
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {samples.map((sample, index) => (
                      <img
                        key={sample.id}
                        src={sample.uri}
                        alt={`Training sample ${index + 1}`}
                        className="w-full h-auto rounded-md"
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Results Section */}
        {model.status === "finished" && (
          <div className="w-full">
            <h2 className="text-3xl font-medium tracking-wide mb-4">Results</h2>
            <div className="grid justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {serverImages?.map((image) => (
                <div key={image.id} className="relative group w-fit">
                  <img
                    src={image.uri}
                    alt={`Generated image ${image.id}`}
                    className="rounded-md h-80 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 rounded-md">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setPreviewImage(image.uri)}
                        >
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <img
                          src={previewImage || ""}
                          alt="Preview"
                          className="w-full h-auto"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() =>
                        handleDownload(
                          image.uri,
                          `generated-image-${image.id}.jpg`
                        )
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
