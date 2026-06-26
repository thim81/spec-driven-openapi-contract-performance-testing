import { Link } from "@tanstack/react-router";
import type { Hero } from "@/lib/marvel/api";
import { heroGradient, heroMonogram } from "@/lib/marvel/images";

/**
 * Movie-poster style card — like marvel.com/movies.
 * Vertical 2:3 art tile (dark, dramatic), title + tagline below on white.
 */
export function HeroCard({ hero, index = 0 }: { hero: Hero; index?: number }) {
  return (
    <Link
      to="/heroes/$id"
      params={{ id: String(hero.id) }}
      className="group block"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Poster */}
      <div
        aria-hidden
        className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--ink)] poster-shadow group-hover:translate-y-[-4px] transition-transform duration-300"
        style={{ background: heroGradient(hero) }}
      >
        {/* Monogram silhouette */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-[16rem] leading-none text-white/15 group-hover:text-white/25 transition-all duration-500">
            {heroMonogram(hero)}
          </span>
        </div>
        {/* Bottom scrim */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: "var(--gradient-scrim)" }} />
        {/* File number */}
        <div className="absolute top-3 left-3 text-[10px] font-sans tracking-[0.3em] uppercase text-white/70">
          № {String(hero.id).padStart(3, "0")}
        </div>
        {/* Red top corner accent on hover */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
        {/* Poster lower text */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="font-display text-3xl uppercase tracking-wide leading-none text-white">
            {hero.name}
          </div>
          {hero.first_name && (
            <div className="mt-1.5 text-[10px] font-sans tracking-[0.3em] uppercase text-white/70">
              {hero.first_name} {hero.last_name}
            </div>
          )}
        </div>
      </div>

      {/* Caption — marvel.com style */}
      <div className="mt-4">
        <div className="font-display text-xl uppercase tracking-wide text-foreground group-hover:text-primary transition-colors leading-tight">
          {hero.name}
        </div>
        {hero.powers[0] && (
          <div className="mt-1 text-[11px] font-sans tracking-[0.2em] uppercase text-muted-foreground">
            {hero.powers[0]}
          </div>
        )}
      </div>
    </Link>
  );
}
