"use client";

import { useState } from "react";
import Navbar from "./Navbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuToggle={setMenuOpen} />
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