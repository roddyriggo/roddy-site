"use client";

import { useState } from "react";

interface NavbarProps {
  menuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
  inverted?: boolean;
}

function MenuLink({
  href,
  inverted,
  children,
}: {
  href: string;
  inverted: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "2.25rem",
        textTransform: "lowercase",
        transition: "color 150ms",
        color: hovered
          ? inverted ? "#000" : "#fff"
          : inverted ? "#a1a1aa" : "#71717a",
      }}
    >
      {children}
    </a>
  );
}

export default function Navbar({ menuOpen, onMenuToggle, inverted = false }: NavbarProps) {
  const toggleMenu = () => {
    onMenuToggle(!menuOpen);
  };

  const lineColor = inverted ? "#000" : "#fff";

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
          zIndex: 9999,
        }}
      >
        {/* TOP LINE */}
        <span
          style={{ backgroundColor: lineColor }}
          className={`absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 ${
            menuOpen ? "rotate-45" : "-translate-y-2"
          }`}
        />

        {/* BOTTOM LINE */}
        <span
          style={{ backgroundColor: lineColor }}
          className={`absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 ${
            menuOpen ? "-rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {/* MENU */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: inverted ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)",
          backdropFilter: menuOpen ? "blur(6px)" : "none",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 600ms ease",
        }}
      >
        <MenuLink href="/music" inverted={inverted}>music</MenuLink>
        <MenuLink href="/writing" inverted={inverted}>writing</MenuLink>
        <MenuLink href="/contact" inverted={inverted}>contact</MenuLink>
        <MenuLink href="/plinko" inverted={inverted}>plinko</MenuLink>
      </div>
    </>
  );
}
