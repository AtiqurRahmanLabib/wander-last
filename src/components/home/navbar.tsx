
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-destination", label: "Add Destination" },
];

const authLinks = [
  { href: "/profile", label: "Profile", icon: true },
  { href: "/login", label: "Login", icon: false },
  { href: "/sign-up", label: "Sign Up", icon: false },
];

function getInitials(name?: string | null) {
  if (!name?.trim()) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      await authClient.signOut();
      setMenuOpen(false);
    } finally {
      setSigningOut(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const renderNavLinks = (mobile = false) =>
    navLinks.map(({ href, label }) => {
      const active = isActiveRoute(pathname, href);

      return (
        <li key={href}>
          <Link
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={mobile ? closeMenu : undefined}
            className={
              mobile
                ? `block rounded-md px-3 py-2.5 transition-colors ${
                    active
                      ? "bg-sky-50 font-semibold text-sky-600"
                      : "font-medium text-zinc-700 hover:bg-zinc-50 hover:text-sky-600"
                  }`
                : `whitespace-nowrap transition-colors ${
                    active
                      ? "font-semibold text-sky-500 underline decoration-2 underline-offset-4"
                      : "font-medium text-zinc-700 hover:text-sky-600"
                  }`
            }
          >
            {label}
          </Link>
        </li>
      );
    });

  const renderAuthLinks = (mobile = false) => {
    if (user) {
      return (
        <>
          <li>
            <Link
              href="/profile"
              onClick={mobile ? closeMenu : undefined}
              className={
                mobile
                  ? "block rounded-md px-3 py-2.5 font-medium text-zinc-700 hover:bg-zinc-50 hover:text-sky-600"
                  : "font-medium text-zinc-700 hover:text-sky-600"
              }
            >
              Profile
            </Link>
          </li>

          {mobile && (
            <li>
              <Button
                type="button"
                variant="destructive"
                className="w-full justify-start"
                disabled={signingOut}
                onClick={handleSignOut}
              >
                {signingOut ? "Signing out..." : "Sign Out"}
              </Button>
            </li>
          )}
        </>
      );
    }

    return authLinks
      .filter(({ href }) => href !== "/profile")
      .map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={mobile ? closeMenu : undefined}
            className={
              mobile
                ? "flex items-center gap-2 rounded-md px-3 py-2.5 font-medium text-zinc-700 hover:bg-zinc-50 hover:text-sky-600"
                : "whitespace-nowrap font-medium text-zinc-700 transition-colors hover:text-sky-600"
            }
          >
            {label}
          </Link>
        </li>
      ));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-14 w-full items-center justify-between gap-3 px-4 sm:px-6"
      >
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {renderNavLinks()}
        </ul>

        {/* Centered logo */}
        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-5 w-auto sm:h-6"
          />
        </Link>

        {/* Desktop account section */}
        <ul className="hidden items-center gap-4 md:flex lg:gap-5">
          {user ? (
            <>
              <li>
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Open account menu"
                        className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        <Avatar>
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name || "User"}
                          />
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    }
                  />

                  <PopoverContent align="end" className="w-64">
                    <PopoverHeader>
                      <PopoverTitle>
                        {user.name || "My Account"}
                      </PopoverTitle>
                    </PopoverHeader>

                    <p className="mb-3 break-all text-sm text-zinc-500">
                      {user.email}
                    </p>

                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full"
                      disabled={signingOut}
                      onClick={handleSignOut}
                    >
                      {signingOut ? "Signing out..." : "Sign Out"}
                    </Button>
                  </PopoverContent>
                </Popover>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="font-medium text-zinc-700 transition-colors hover:text-sky-600"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            renderAuthLinks()
          )}
        </ul>

        {/* Mobile account shortcut */}
        <Link
          href={user ? "/profile" : "/login"}
          aria-label={user ? "Profile" : "Login"}
          className="flex size-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden"
        >
          {user ? (
            <Avatar className="size-8">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || "User"}
              />
              <AvatarFallback>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="size-5" aria-hidden="true" />
          )}
        </Link>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {renderNavLinks(true)}

            <li
              aria-hidden="true"
              className="my-1 border-t border-zinc-200"
            />

            {renderAuthLinks(true)}
          </ul>
        </div>
      )}
    </header>
  );
}
