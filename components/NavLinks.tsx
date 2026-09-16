"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/meetings",
        label: "All Meetings",
    },
    {
        href: "/meetings/current",
        label: "Current Meeting",
    },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main navigation">
            <ul className="flex flex-wrap gap-2">
                {links.map((link) => {
                    const isActive =
                        link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href);

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`block rounded-md px-4 py-2 text-sm font-medium transition ${isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}