import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--ink)] text-[var(--ink-foreground)] border-b border-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* Spacer */}
        <div className="flex-1 flex items-center gap-6">
          <button
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        {/* Center: Marvel logo */}
        <Link to="/" aria-label="Marvel Universe — Home" className="shrink-0">
          <span className="grid place-items-center bg-primary px-3 py-1.5 select-none">
            <span className="font-display text-2xl md:text-3xl tracking-[0.02em] leading-none text-primary-foreground">
              MARVEL
            </span>
          </span>
        </Link>

        {/* Right nav */}
        <nav className="flex-1 flex items-center justify-end gap-1 text-sm">
          <NavLink to="/">Heroes</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </div>

      {/* Secondary nav strip */}
      <div className="bg-[var(--ink)] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-center gap-8 text-[11px] font-sans tracking-[0.25em] uppercase text-white/60">
          <span>News</span>
          <span>Characters</span>
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="text-white hover:text-primary transition-colors"
          >
            Heroes
          </Link>
          <Link
            to="/movies"
            activeOptions={{ exact: true }}
            className="text-white hover:text-primary transition-colors"
          >
            Movies
          </Link>
          <span>Comics</span>
          <span>Videos</span>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: "/" | "/movies"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      activeProps={{ className: "text-primary" }}
      className="px-4 py-2 font-display text-base tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
