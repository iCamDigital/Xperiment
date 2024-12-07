"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Pack {
  id: string;
  title: string;
  cover_url: string;
  slug: string;
}

export default function PacksGalleryZone() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPacks = async (): Promise<void> => {
    try {
      const response = await fetch("/astria/packs");
      const data = await response.json();
      setPacks(data);
    } catch (err) {
      toast({
        title: "Error loading styles",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card
            key={i}
            className="overflow-hidden bg-background/40 backdrop-blur"
          >
            <Skeleton className="aspect-[4/5] w-full" />
            <CardContent className="p-3 md:p-4">
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-base text-muted-foreground">
          No styles available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 p-4">
      {packs.map((pack) => (
        <Link
          href={`/overview/models/train/${pack.slug}`}
          key={pack.id}
          className="group relative block"
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={pack.cover_url || "/api/placeholder/400/300"}
                alt={pack.title}
                className="object-cover absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-3 md:p-4 bg-background/80 backdrop-blur-sm">
              <h3 className="text-center font-medium capitalize text-xs md:text-sm tracking-wide line-clamp-1">
                {pack.title}
              </h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
