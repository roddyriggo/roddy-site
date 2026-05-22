"use client";

import { useState } from "react";

interface NavbarProps {
  onMenuToggle: (isOpen: boolean) => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    onMenuToggle(newState);
  };

  return (
    <>
      {/* HAMBURGER */}
      <button
          onClick={toggleMenu}
  style={{
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "40px",
    height: "40px",
    zIndex: 9999
  }}
>
        {/* TOP LINE */}
        <span
          className={`absolute left-0 top-1/2 w-6 h-[1px] bg-white transition-all duration-300 ${
            menuOpen ? "rotate-45" : "-translate-y-2"
          }`}
        />

        {/* BOTTOM LINE */}
        <span
          className={`absolute left-0 top-1/2 w-6 h-[1px] bg-white transition-all duration-300 ${
            menuOpen ? "-rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {/* MENU */}
      {menuOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(6px)",
      zIndex: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",

          opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? "auto" : "none",
    transition: "opacity 1000ms ease",

    }}
  >
          <a
            href="/music"
            className="text-4xl lowercase text-zinc-500 hover:text-white transition-colors"
          >
            music
          </a>

          <a
            href="/writing"
            className="text-4xl lowercase text-zinc-500 hover:text-white transition-colors"
          >
            writing
          </a>

          <a
            href="/contact"
            className="text-4xl lowercase text-zinc-500 hover:text-white transition-colors"
          >
            contact
          </a>

        </div>
      )}
    </>
  );
}