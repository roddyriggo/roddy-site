"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "./Navbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const inverted = pathname === "/music" || pathname === "/writing" || pathname === "/contact" || pathname === "/plinko";

  return (
    <>
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          zIndex: 9999,
        }}
        className={`tracking-[0.2em] lowercase transition-colors ${
          inverted
            ? "text-black hover:text-zinc-700"
            : "text-zinc-300 hover:text-white"
        }`}
      >
        roddyriggo
      </Link>
      <Navbar menuOpen={menuOpen} onMenuToggle={setMenuOpen} inverted={inverted} />
      <div
        className={`transition-opacity duration-1000 ${
          menuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}