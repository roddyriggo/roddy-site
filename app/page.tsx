"use client";

import { useState } from "react";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#050505] text-[#f5f5f5] min-h-screen overflow-hidden">

      {/* GRAIN */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-6 lowercase tracking-[0.2em] text-sm relative z-50">

        <div>roddyriggo</div>

        {/* HAMBURGER */}
        <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="relative w-6 h-6"
>

  {/* TOP LINE */}
  <span
    className={`absolute left-0 top-1/2 w-6 h-[1px] bg-white transition-all duration-300 ${
      menuOpen
        ? "rotate-45"
        : "-translate-y-2"
    }`}
  />

  {/* BOTTOM LINE */}
  <span
    className={`absolute left-0 top-1/2 w-6 h-[1px] bg-white transition-all duration-300 ${
      menuOpen
        ? "-rotate-45"
        : "translate-y-2"
    }`}
  />
        </button>

      </nav>

      {/* FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >

        <div className="flex flex-col gap-8 text-4xl lowercase tracking-[0.2em] text-zinc-500">

          <a href="#"
  onClick={() => setMenuOpen(false)}
  className="text-zinc-500 hover:text-white transition-colors duration-300"
>
  Writing
</a>

          <a href="#"
  onClick={() => setMenuOpen(false)}
  className="text-zinc-500 hover:text-white transition-colors duration-300"
>
  Music
</a>

          <a href="#"
  onClick={() => setMenuOpen(false)}
  className="text-zinc-500 hover:text-white transition-colors duration-300"
>
  Contact
</a>

        </div>

      </div>

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-center px-8">

        <h1 className="text-[22vw] leading-none font-black tracking-[-0.1em] font-sans">
          RDDY
        </h1>

        <p className="mt-8 text-zinc-500 uppercase tracking-[0.2em] text-sm max-w-md">
          Producer / Writer
        </p>

      </section>

{/* BOTTOM TEXT */}
<div className="absolute bottom-15 left-1/2 -translate-x-1/2 text-[15px] uppercase tracking-[0.3em] text-zinc-700">

  -.. . ..- ... / ...- ..- .-.. -

</div>

    </main>
  );
}