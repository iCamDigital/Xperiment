// LayoutWrapper.tsx (Server Component)
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

interface LayoutWrapperProps {
  children: ReactNode;
  user: any;
}

export default async function LayoutWrapper({
  children,
  user,
}: LayoutWrapperProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  const { data: credits } = await supabase
    .from("credits")
    .select("*")
    .eq("user_id", supabaseUser?.id ?? "")
    .single();

  return (
    <ClientLayout user={user} credits={credits}>
      {children}
    </ClientLayout>
  );
}
