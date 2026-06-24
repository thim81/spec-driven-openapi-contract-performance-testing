import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, useSuspenseQueries } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  heroQuery,
  heroAppearancesQuery,
  movieQuery,
} from "@/lib/marvel/api";
import { getHeroById } from "@/lib/marvel/data";
import { heroGradient, heroMonogram } from "@/lib/marvel/images";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { reportLovableError } from "@/lib/lovable-error-reporting";

export const Route = createFileRoute("/heroes/$id")({
  head: ({ params }) => {
    const hero = getHeroById(Number(params.id));
    const title = hero ? `${hero.name} — Marvel Universe` : "Hero — Marvel Universe";
    const description = hero?.description ?? "A hero from the Marvel Universe.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ context, params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id) || !getHeroById(id)) throw notFound();
    context.queryClient.ensureQueryData(heroQuery(id));
    context.queryClient.ensureQueryData(heroAppearancesQuery(id));
  },
  component: HeroDetail,
  errorComponent: HeroError,
  notFoundComponent: HeroNotFound,
});

function HeroNotFound() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="font-display text-7xl text-primary">Unknown Hero</div>
        <p className="mt-4 text-muted-foreground">No file in the archive matches that ID.</p>
        <Link to="/" className="mt-8 inline-block bg-primary px-6 py-3 font-display tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition">
          ← Back to Heroes
        </Link>
      </div>
    </Shell>
  );
}

function HeroError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "hero_detail" });
  }, [error]);
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="font-display text-5xl text-primary">Signal lost</div>
        <p className="mt-4 text-muted-foreground">Couldn't reach this hero's file.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-8 bg-primary px-6 py-3 font-display tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition"
        >
          Retry
        </button>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function HeroDetail() {
  const { id } = Route.useParams();
  const heroId = Number(id);
  const { data: hero } = useSuspenseQuery(heroQuery(heroId));
  const { data: appearances } = useSuspenseQuery(heroAppearancesQuery(heroId));

  const movieResults = useSuspenseQueries({
    queries: appearances.map((a) => movieQuery(a.movie_id)),
  });
  const moviesWithRole = movieResults.map((r, i) => ({
    movie: r.data,
    role: appearances[i].role,
  })).sort((a, b) => a.movie.release_year - b.movie.release_year);

  return (
    <Shell>
      {/* Cinematic dark banner */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--ink-foreground)]">
        <div aria-hidden className="absolute inset-0" style={{ background: heroGradient(hero) }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-scrim-left)" }} />
        <div aria-hidden className="pointer-events-none absolute right-[-6rem] top-1/2 -translate-y-1/2 select-none font-display text-[34rem] leading-none text-white/[0.07]">
          {heroMonogram(hero)}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-24 md:pt-16 md:pb-32 min-h-[520px] flex flex-col justify-end">
          <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.3em] uppercase text-white/70 hover:text-white transition self-start">
            ← Archive
          </Link>

          <div className="mt-8 flex items-center gap-3 text-[11px] font-sans tracking-[0.3em] uppercase text-white/80">
            <span className="inline-block h-2 w-2 bg-primary" />
            File № {String(hero.id).padStart(3, "0")}
          </div>

          <h1 className="mt-3 font-display text-7xl md:text-[10rem] tracking-wide leading-[0.85] text-white text-balance uppercase">
            {hero.name}
          </h1>

          {hero.first_name && (
            <p className="mt-3 font-sans text-sm tracking-[0.3em] uppercase text-white/60">
              {hero.first_name} {hero.last_name}
            </p>
          )}

          {hero.description && (
            <p className="mt-6 max-w-3xl text-base md:text-lg text-white/85 leading-relaxed">
              {hero.description}
            </p>
          )}
        </div>
      </section>


      {/* Details grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-3 gap-12">
        {/* Powers */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 text-xs font-sans tracking-[0.3em] uppercase text-primary">
            <span className="h-px w-10 bg-primary" />
            Powers
          </div>
          <h2 className="mt-3 font-display text-4xl text-foreground">Abilities</h2>
          <ul className="mt-6 space-y-3">
            {hero.powers.map((power) => (
              <li
                key={power}
                className="flex items-start gap-3 border border-border bg-secondary p-4 hover:border-primary hover:bg-background transition-colors"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary rounded-full" />
                <span className="font-sans text-foreground/90">{power}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Appearances */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-xs font-sans tracking-[0.3em] uppercase text-primary">
            <span className="h-px w-10 bg-primary" />
            Filmography
          </div>
          <h2 className="mt-3 font-display text-4xl text-foreground">Movie Appearances</h2>

          {moviesWithRole.length === 0 ? (
            <p className="mt-6 text-muted-foreground">
              No screen appearances logged yet for this hero.
            </p>
          ) : (
            <ol className="mt-6 divide-y divide-border border border-border bg-background">
              {moviesWithRole.map(({ movie, role }) => (
                <li key={movie.id}>
                  <Link
                    to="/movies/$id"
                    params={{ id: String(movie.id) }}
                    className="group flex items-center gap-5 p-5 hover:bg-secondary transition-colors"
                  >
                    <div className="font-display text-3xl text-muted-foreground tabular-nums w-20 shrink-0 group-hover:text-primary transition-colors">
                      {movie.release_year}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-2xl tracking-wide text-foreground truncate group-hover:text-primary transition-colors">
                        {movie.title}
                      </div>
                      <div className="text-xs font-sans tracking-widest uppercase text-muted-foreground mt-1">
                        dir. {movie.director}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-sans tracking-widest uppercase shrink-0 ${
                      role === "lead" ? "bg-primary text-primary-foreground"
                      : role === "supporting" ? "border border-primary text-primary"
                      : "border border-border text-muted-foreground"
                    }`}>
                      {role}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </Shell>
  );
}
