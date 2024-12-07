// ClientLayout.tsx
"use client";

import { useState, ReactNode } from "react";
import { HeaderWrapper } from "./Header";
import ClientSideNav from "./ClientSideNav";
import { Database } from "@/types/supabase";

interface ClientLayoutProps {
  children: ReactNode;
  user: any;
  credits: Database["public"]["Tables"]["credits"]["Row"] | null;
}

export default function ClientLayout({
  children,
  user,
  credits,
}: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-slate-100 h-screen flex overflow-hidden relative">
      {/* Desktop Sidebar */}
      <div className="w-64 flex-shrink-0 hidden lg:block relative">
        <ClientSideNav
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          credits={credits}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <ClientSideNav
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          credits={credits}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <HeaderWrapper
          initialUser={user}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-y-auto relative">
          <div className="h-full mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
