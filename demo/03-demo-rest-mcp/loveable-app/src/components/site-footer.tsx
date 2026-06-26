export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--ink-foreground)] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <span className="inline-grid place-items-center bg-primary px-3 py-1.5">
            <span className="font-display text-2xl tracking-[0.02em] leading-none text-primary-foreground">
              MARVEL
            </span>
          </span>
          <p className="mt-5 max-w-xs text-sm text-white/60 leading-relaxed">
            A fan-built archive of the Marvel Universe — characters, films, and the threads that
            connect them.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-sans tracking-[0.3em] uppercase text-white/40 mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="text-white/80 hover:text-primary transition">Heroes</a></li>
            <li><a href="/movies" className="text-white/80 hover:text-primary transition">Movies</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] font-sans tracking-[0.3em] uppercase text-white/40 mb-4">
            About
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Built from the Marvel Universe OpenAPI specification. Fan project — not affiliated with
            Marvel Entertainment.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-white/40">
          <span>© Marvel Universe Archive</span>
          <span>Made with reverence</span>
        </div>
      </div>
    </footer>
  );
}
