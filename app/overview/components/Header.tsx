"use client";

import { PanelLeft, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: any;
}

export function HeaderWrapper({
  initialUser,
  isSidebarOpen,
  toggleSidebar,
}: {
  initialUser: any;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <Header
      isOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      user={initialUser}
    />
  );
}

function Header({ isOpen, toggleSidebar, user }: HeaderProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get user's name from metadata, email, or provide a fallback
  const getUserName = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(" ")[0];
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  const userName = getUserName();

  return (
    <div className="p-3 lg:p-5 lg:py-8 shadow-sm border-b-2 bg-white relative z-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="w-full sm:w-auto">
          {/* Top section with greeting, menu icon, and UserButton for mobile */}
          <div className="flex justify-between items-center sm:hidden mb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="text-gray-700 hover:text-primary transition-colors lg:hidden"
                aria-label="Toggle sidebar"
              >
                <PanelLeft
                  className={`h-6 w-6 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold">
                Hey, {userName}!
              </h1>
            </div>
            <UserDropdown user={user} />
          </div>

          {/* Hidden on mobile, visible on tablet/desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-primary transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              <PanelLeft
                className={`h-6 w-6 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold">Hey, {userName}!</h1>
          </div>
          <p className="text-sm lg:text-base text-gray-500">{currentDate}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center w-full sm:w-auto">
          <h2 className="bg-primary p-1 rounded-full text-xs lg:text-sm text-white px-2 whitespace-normal sm:whitespace-nowrap text-center w-full sm:w-auto">
            🔔 Get your first credit just for $12
          </h2>
          {/* Show on tablet, hide on mobile and large desktop */}
          <div className="hidden sm:block lg:hidden">
            <UserDropdown user={user} />
          </div>
          {/* Only show on large desktop */}
          <div className="hidden lg:block">
            <UserDropdown user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Supabase User Dropdown Component
function UserDropdown({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full focus:outline-none bg-blue-100"
        >
          <Avatar className="h-9 w-9 bg-blue-100">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.email || ""}
              className="bg-blue-100"
            />
            <AvatarFallback className="bg-blue-100">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-blue-600">
              {user.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action="/auth/sign-out" method="post">
          <DropdownMenuItem asChild>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
