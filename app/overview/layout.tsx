import "../globals.css";
import { Suspense } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoadingSpinner from "@/components/LoadingSpinner";
import Login from "../login/page";
import LayoutWrapper from "./components/LayoutWrapper";

// Layout Loading Component
function LayoutLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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

  return (
    <Suspense fallback={<LayoutLoading />}>
      <LayoutWrapper user={user}>{children}</LayoutWrapper>
    </Suspense>
  );
}
