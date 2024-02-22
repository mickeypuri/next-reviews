"use client";

import Link from "next/link";

export function NavLink({ href, children, prefetch = true }) {
  return (
    <Link href={href} 
      className="text-orange-800 hover:underline"
      prefetch={prefetch}>
      {children}
    </Link>
  );
}