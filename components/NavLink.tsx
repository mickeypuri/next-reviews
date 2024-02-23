"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children, prefetch = true }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  if (isActive) {
    return (
      <span className="text-orange-800 cursor-not-allowed">
        {children}
      </span>
    )
  }
  return (
    <Link href={href} 
      className="text-orange-800 hover:underline"
      prefetch={prefetch}>
      {children}
    </Link>
  );
}