// /app/overview/models/[id]/page.tsx
import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ModelPageClient from "./ModelPageClient";
import Login from "@/app/login/page";
import { redirect } from "next/navigation";
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

// Server Component
export default async function ModelPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  const { data: model } = await supabase
    .from("models")
    .select("*")
    .eq("id", Number(params.id))
    .eq("user_id", user.id)
    .single();

  if (!model) {
    redirect("/overview");
  }

  const { data: images } = await supabase
    .from("images")
    .select("*")
    .eq("modelId", model.id);

  const { data: samples } = await supabase
    .from("samples")
    .select("*")
    .eq("modelId", model.id);

  return (
    <Suspense fallback={<ModelsLoading />}>
      <ModelPageClient
        model={model}
        images={images ?? []}
        samples={samples ?? []}
      />
    </Suspense>
  );
}
