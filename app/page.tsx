export default function Home() {
  return (
    <main className="bg-[#050505] text-[#f5f5f5] min-h-screen overflow-hidden">

      {/* GRAIN */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-6 lowercase tracking-[0.2em] text-sm">

        <div>roddyriggo</div>

        <div className="flex gap-8 text-zinc-500">
          <a href="#">Archive</a>
          <a href="#">Music</a>
          <a href="#">Contact</a>
        </div>

      </nav>

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-center px-8">

        <h1 className="text-[22vw] leading-none font-black tracking-[-0.1em]">
          R D D Y
        </h1>

        <p className="mt-8 text-zinc-500 uppercase tracking-[0.2em] text-sm max-w-md">
          Producer / Artist

        </p>

      </section>

    </main>
  );
 } 