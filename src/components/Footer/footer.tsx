import Image from "next/image"
import NewsletterForm from "@/components/Footer/newsletter-form"
import type { ReactNode } from "react"

const linkColumns = [
  {
    label: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Destinations", href: "/destinations" },
      { name: "My Bookings", href: "/my-bookings" },
      { name: "My Profile", href: "/profile" },
    ],
  },
  {
    label: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
]

const socialLinks = [
  {
    name: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.733-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1-.002-4.126 2.063 2.063 0 0 1 .002 4.126Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0 1.802c-3.169 0-3.495.012-4.733.068-2.612.119-3.678 1.204-3.797 3.797-.056 1.238-.068 1.564-.068 4.733 0 3.169.012 3.495.068 4.733.119 2.612 1.204 3.678 3.797 3.797 1.238.056 1.564.068 4.733.068 3.169 0 3.495-.012 4.733-.068 2.612-.119 3.678-1.204 3.797-3.797.056-1.238.068-1.564.068-4.733 0-3.169-.012-3.495-.068-4.733-.119-2.612-1.204-3.678-3.797-3.797-1.238-.056-1.564-.068-4.733-.068Zm0 3.062a4.973 4.973 0 1 1 0 9.946 4.973 4.973 0 0 1 0-9.946Zm0 1.802a3.171 3.171 0 1 0 0 6.342 3.171 3.171 0 0 0 0-6.342Zm6.406-3.399a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0Z",
  },
]

function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs tracking-wider text-zinc-500 uppercase">
      {children}
    </h3>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#141414]">
      <div className="mx-auto max-w-360 px-4 pt-16 pb-10 sm:px-6">
        <Image
          src="/assets/Wanderlast-1.png"
          alt="Wanderlast"
          width={320}
          height={47}
          className="h-auto w-70 sm:w-[320px]"
        />
        <p className="mt-4 text-sm text-zinc-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <ColumnLabel>Newsletter</ColumnLabel>
            <p className="mt-3 text-xs text-zinc-500">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>

          {linkColumns.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <ColumnLabel>{column.label}</ColumnLabel>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <ColumnLabel>Contact Us</ColumnLabel>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href="tel:7869011622"
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlast.com"
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  info@wanderlast.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500">
            © 2025 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="text-zinc-400 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
