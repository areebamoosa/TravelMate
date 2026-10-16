"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/trips", label: "Trips" },
  { href: "/bookings", label: "Bookings" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

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
  );
}
