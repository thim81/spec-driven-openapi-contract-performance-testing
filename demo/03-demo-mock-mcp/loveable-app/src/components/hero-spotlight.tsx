import { Link } from "@tanstack/react-router";
import type { Hero } from "@/lib/marvel/data";
import { heroGradient, heroMonogram } from "@/lib/marvel/images";

/**
 * Cinematic full-bleed hero band — marvel.com style.
 * Dark imagery with a left-weighted gradient scrim so editorial copy reads cleanly.
 */
export function HeroSpotlight({ hero }: { hero: Hero }) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--ink-foreground)]">
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: heroGradient(hero) }}
      />
      {/* Monogram silhouette on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6rem] top-1/2 -translate-y-1/2 select-none font-display text-[36rem] leading-none text-white/[0.07]"
      >
        {heroMonogram(hero)}
      </div>
      {/* Left scrim for legibility */}
      <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-scrim-left)" }} />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-36 min-h-[560px] flex flex-col justify-end">
        <div className="flex items-center gap-3 text-[11px] font-sans tracking-[0.3em] uppercase text-white/70">
          <span className="inline-block h-2 w-2 bg-primary" />
          Featured Character
        </div>

        <h1 className="mt-4 font-display text-7xl md:text-[9rem] tracking-wide leading-[0.85] text-white text-balance max-w-4xl uppercase">
          {hero.name}
        </h1>

        {hero.first_name && (
          <p className="mt-3 font-sans text-sm tracking-[0.3em] uppercase text-white/60">
            {hero.first_name} {hero.last_name}
          </p>
        )}

        {hero.description && (
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">
            {hero.description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/heroes/$id"
            params={{ id: String(hero.id) }}
            className="inline-flex items-center gap-3 bg-primary px-7 py-3.5 font-display text-base tracking-[0.2em] uppercase text-primary-foreground hover:bg-primary/90 transition"
          >
            View Profile <span aria-hidden>→</span>
          </Link>
          <Link
            to="/movies"
            className="inline-flex items-center gap-3 border border-white/30 px-7 py-3.5 font-display text-base tracking-[0.2em] uppercase text-white hover:border-white hover:bg-white/5 transition"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </section>
  );
}
