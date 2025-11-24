"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";

function Header() {
  const { data: session, isPending } = useSession()

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create Post",
      href: "/post/create",
    }
  ];
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex justify-between w-full max-w-2xl items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            Blog App
          </Link>
          <nav className="flex items-center gap-3 md:gap-6">
            {
              navItems.map(navItem => (
                <Link key={navItem.href} href={navItem.href} className={cn('text-sm font-bold transition-colors hover:text-primary')}>{navItem.label}</Link>
              ))
            }
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* Search */}
          </div>

          {/* placeholder for theme toggle */}
          <ThemeToggle />

          <div className="flex items-center gap-2">
            {
              isPending ? null : session?.user ? (<UserMenu user={session?.user} />)
                :
                (<Button className="cursor-pointer" variant={"default"} asChild>
                  <Link href="/auth">Login</Link>
                </Button>)
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
