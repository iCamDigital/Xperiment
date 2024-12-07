import { Suspense } from "react";
import ClientSideModelsList from "@/app/overview/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoadingSpinner from "@/components/LoadingSpinner";

export const dynamic = "force-dynamic";

// Models Loading Component
function ModelsLoading() {
  return (
    <div className="container mt-48 mb-2 items-center justify-center flex">
      <div className="w-full max-w-md">
        <LoadingSpinner />
      </div>
    </div>
  );
}

async function ModelsContent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const { data: models } = await supabase
    .from("models")
    .select(
      `*, samples (
          *
        )`
    )
    .eq("user_id", user?.id ?? "");

  return <ClientSideModelsList serverModels={models ?? []} />;
}

export default function Overview() {
  return (
    <Suspense fallback={<ModelsLoading />}>
      <ModelsContent />
    </Suspense>
  );
}
