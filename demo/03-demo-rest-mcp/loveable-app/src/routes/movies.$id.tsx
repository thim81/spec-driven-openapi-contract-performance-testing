import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";

import {
  movieQuery,
  movieAppearancesQuery,
  heroQuery,
  isMarvelApiNotFoundError,
} from "@/lib/marvel/api";
import { heroGradient, heroMonogram } from "@/lib/marvel/images";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/movies/$id")({
  head: ({ params }) => {
    const title = `Movie #${params.id} — Marvel Universe`;
    const description = "A film in the Marvel Universe.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: async ({ context, params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw notFound();

    try {
      await Promise.all([
        context.queryClient.ensureQueryData(movieQuery(id)),
        context.queryClient.ensureQueryData(movieAppearancesQuery(id)),
      ]);
    } catch (error) {
      if (isMarvelApiNotFoundError(error)) throw notFound();
      throw error;
    }
  },
  component: MovieDetail,
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <div className="font-display text-7xl text-primary">Unknown Movie</div>
        <Link to="/movies" className="mt-8 inline-block bg-primary px-6 py-3 font-display tracking-widest uppercase text-primary-foreground hover:bg-primary/90 transition">
          ← Back to Movies
        </Link>
      </div>
    </Shell>
  ),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function MovieDetail() {
  const { id } = Route.useParams();
  const movieId = Number(id);
  const { data: movie } = useSuspenseQuery(movieQuery(movieId));
  const { data: appearances } = useSuspenseQuery(movieAppearancesQuery(movieId));

  const heroResults = useSuspenseQueries({
    queries: appearances.map((a) => heroQuery(a.hero_id)),
  });
  const heroesInMovie = heroResults
    .map((r, i) => ({ hero: r.data, role: appearances[i].role }))
    .sort((a, b) => {
      const order = { lead: 0, supporting: 1, cameo: 2 } as const;
      return order[a.role] - order[b.role];
    });

  return (
    <Shell>
      <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--ink-foreground)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 70% 40%, oklch(0.35 0.18 ${(movie.id * 37) % 360} / 0.55) 0%, transparent 60%), linear-gradient(135deg, oklch(0.22 0.08 ${(movie.id * 37) % 360}) 0%, oklch(0.1 0 0) 100%)`
          }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--gradient-scrim-left)" }} />
        <div aria-hidden className="pointer-events-none absolute right-[-4rem] top-1/2 -translate-y-1/2 select-none font-display text-[26rem] leading-none text-white/[0.07] tabular-nums">
          {movie.release_year}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-24 md:pt-16 md:pb-28 min-h-[480px] flex flex-col justify-end">
          <Link to="/movies" className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.3em] uppercase text-white/70 hover:text-white transition self-start">
            ← Filmography
          </Link>

          <div className="mt-8 flex items-center gap-3 text-[11px] font-sans tracking-[0.3em] uppercase text-white/80">
            <span className="inline-block h-2 w-2 bg-primary" />
            Marvel Studios · {movie.release_year}
          </div>
          <h1 className="mt-3 font-display text-6xl md:text-[8rem] uppercase tracking-wide leading-[0.85] text-white text-balance">
            {movie.title}
          </h1>
          <p className="mt-4 text-[11px] font-sans tracking-[0.3em] uppercase text-white/60">
            Directed by {movie.director}
          </p>
          {movie.description && (
            <p className="mt-6 max-w-3xl text-base md:text-lg text-white/85 leading-relaxed">
              {movie.description}
            </p>
          )}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center gap-3 text-xs font-sans tracking-[0.3em] uppercase text-primary">
          <span className="h-px w-10 bg-primary" />
          Cast
        </div>
        <h2 className="mt-3 font-display text-5xl text-foreground">Heroes On Screen</h2>

        {heroesInMovie.length === 0 ? (
          <p className="mt-6 text-muted-foreground">No heroes logged for this film yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {heroesInMovie.map(({ hero, role }) => (
              <Link
                key={hero.id}
                to="/heroes/$id"
                params={{ id: String(hero.id) }}
                className="group relative overflow-hidden border border-border bg-background hover:border-primary hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                <div
                  aria-hidden
                  className="relative aspect-[16/9] w-full overflow-hidden"
                  style={{ background: heroGradient(hero) }}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-[8rem] leading-none text-white/20">
                      {heroMonogram(hero)}
                    </span>
                  </div>
                  <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-sans tracking-[0.25em] uppercase ${
                    role === "lead" ? "bg-primary text-primary-foreground"
                    : role === "supporting" ? "bg-white/90 text-primary"
                    : "bg-white/80 text-foreground"
                  }`}>
                    {role}
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-display text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {hero.name}
                  </div>
                  {hero.first_name && (
                    <div className="text-xs font-sans tracking-widest uppercase text-muted-foreground mt-1">
                      {hero.first_name} {hero.last_name}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Shell>
  );
}
