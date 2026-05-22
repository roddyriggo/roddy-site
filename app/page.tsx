export default function Home() {
  return (
    <main className="relative bg-[#050505] text-[#f5f5f5] min-h-screen overflow-hidden">

      {/* GRAIN */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

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