import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const ActionButtons = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {/* Rendered navbar when user is not logged in */}
      {!user && (
        <>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <AlignJustify />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetDescription>
                    <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                      <Link href="/">Home</Link>
                      <Link href="/documentation/intro">Documentation</Link>
                      <Link href="/#pricing">Pricing</Link>
                      <Link href="/refund">Refunds</Link>
                      <Link href="/overview">Get Started</Link>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex md:space-x-4">
            <Link href="/overview">
              <Button className="text-md bg-blue-600">Get Started</Button>
            </Link>
          </div>
        </>
      )}

      {/* Rendered navbar when user is logged in */}
      {user && (
        <>
          {/* Mobile Version */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <AlignJustify />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetDescription>
                    <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                      <Link href="/">Home</Link>
                      {/* Log out link styled as a regular link */}
                      <form action="/auth/sign-out" method="post">
                        <button
                          type="submit"
                          className="text-lg text-black cursor-pointer"
                        >
                          Log out
                        </button>
                      </form>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
