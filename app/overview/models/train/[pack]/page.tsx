import TrainModelZone from "@/components/TrainModelZone";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const dynamic = "force-dynamic";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default async function Index({ params }: { params: { pack: string } }) {
  return (
    <div className="w-full mx-auto p-5 relative">
      <Link
        href={packsIsEnabled ? "/overview/packs" : "/overview"}
        className="absolute left-5 top-5"
      >
        <Button variant="default" size="sm">
          ← Back
        </Button>
      </Link>

      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-5xl font-bold tracking-wide">Train Model</h1>
        <p className="text-sm text-muted-foreground">
          Choose a name, type, and upload some photos to get started.
        </p>
      </div>

      <div className="flex justify-center w-full mt-8">
        <div className="max-w-2xl w-full">
          <TrainModelZone packSlug={params.pack} />
        </div>
      </div>
    </div>
  );
}
