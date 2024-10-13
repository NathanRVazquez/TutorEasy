"use client";

import React from "react";
import Link from "next/link";
import { House, Users, BookCopy, Notebook } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  {
    href: "/dashboard",
    label: "Home",
    icon: House,
  },
  {
    href: "/dashboard/classes",
    label: "Classes",
    icon: BookCopy,
  },
  {
    href: "/dashboard/tutors",
    label: "Tutors",
    icon: Users,
  },
  {
    href: "/dashboard/tutoring-sessions",
    label: "Sessions",
    icon: Notebook,
  },
];

const SideMenuLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col grow gap-4 lg:gap-1">
      {navLinks.map((link, key) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={key}
            href={link.href}
            className={clsx(
              `flex justify-center items-center gap-2 lg:justify-start rounded-lg p-2`,
              {
                "bg-gray-200": pathname === link.href,
              }
            )}
          >
            <LinkIcon size={20} />
            <p className="font-semibold text-lg hidden lg:block">
              {link.label}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideMenuLinks;
