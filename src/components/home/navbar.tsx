"use client";

import { User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-destination", label: "Add Destination" },
];

const authLinks = [
  { href: "/profile", label: "Profile", icon: true },
  { href: "/login", label: "Login", icon: false },
  { href: "/signup", label: "Sign Up", icon: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <nav className="relative mx-auto flex h-14 w-full items-center justify-between gap-3 px-4 sm:px-6">
        {/* Primary links (desktop) */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center whitespace-nowrap transition-colors ${
                    isActive
                      ? "font-semibold text-sky-500 underline decoration-2 underline-offset-4"
                      : "font-medium text-zinc-700 hover:text-sky-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Centered wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Wanderlast home"
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

        {/* Account links (desktop) */}
        <ul className="hidden items-center gap-4 md:flex lg:gap-5">
          {authLinks.map((link) => (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-zinc-700 transition-colors hover:text-sky-600"
              >
                {link.icon && <User className="size-4" aria-hidden="true" />}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile shortcut (small screens) */}
        <Link
          href="/profile"
          className="flex size-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden"
          aria-label="Profile"
        >
          <User className="size-5" aria-hidden="true" />
        </Link>
      </nav>

      {/* Mobile navigation menu */}
      {menuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-md px-3 py-2.5 transition-colors ${
                      isActive
                        ? "bg-sky-50 font-semibold text-sky-600"
                        : "font-medium text-zinc-700 hover:bg-zinc-50 hover:text-sky-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            <li className="my-1 border-t border-zinc-200" />

            {authLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-sky-600"
                >
                  {link.icon && <User className="size-4" aria-hidden="true" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
