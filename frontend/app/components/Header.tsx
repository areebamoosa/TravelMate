"use client";

import AuthMenu from "@/app/components/AuthMenu";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/trips", label: "Trips" },
  { href: "/bookings", label: "Bookings" },
];

function Logo() {
  return (
    <a href="/" className="flex shrink-0 items-center gap-2">
      <span className="text-lg font-bold tracking-tight text-stone-900">
        TRAVEL<span className="text-brand">MATE</span>
      </span>
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-brand" aria-hidden="true">
        <path
          fill="currentColor"
          d="M28 14.2 18.4 16l-3.2-6.2c-.4-.8-1.4-1.1-2.2-.7l-.6.3 2.2 7.2-6.4 1.2-1.8-2.2c-.3-.4-.8-.6-1.3-.5l-.8.2 1.6 4.4c.2.5.7.8 1.2.7l20.2-3.8c.8-.2 1.3-1 1.1-1.8-.1-.3-.3-.5-.6-.6Z"
        />
      </svg>
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 text-base font-medium lg:justify-center">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={active ? "text-brand" : "text-stone-800 hover:text-brand"}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-5 lg:justify-end">
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}
