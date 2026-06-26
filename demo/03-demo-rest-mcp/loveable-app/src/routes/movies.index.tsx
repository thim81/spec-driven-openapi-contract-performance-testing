import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { moviesQuery } from "@/lib/marvel/api";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/movies/")({
  head: () => ({
    meta: [
      { title: "Marvel Movies — Marvel Universe" },
      {
        name: "description",
        content: "Journey into the cosmic depths of the mighty Marvel Cinematic Universe — every film, indexed.",
      },
      { property: "og:title", content: "Marvel Movies — Marvel Universe" },
      { property: "og:description", content: "Every Marvel film, indexed by year and director." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(moviesQuery());
  },
  component: MoviesPage,
});

function MoviesPage() {
  const { data: movies } = useSuspenseQuery(moviesQuery());
  const sorted = [...movies].sort((a, b) => a.release_year - b.release_year);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Cinematic banner */}
        <section className="relative overflow-hidden bg-[var(--ink)] text-[var(--ink-foreground)]">
          <div aria-hidden className="absolute inset-0 opacity-90" style={{
            background: "radial-gradient(ellipse at 30% 50%, oklch(0.35 0.18 27 / 0.5) 0%, transparent 60%), linear-gradient(135deg, oklch(0.2 0.05 27) 0%, oklch(0.12 0 0) 100%)"
          }} />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
            <div className="flex items-center justify-center gap-3 text-[11px] font-sans tracking-[0.3em] uppercase text-white/70">
              <span className="inline-block h-2 w-2 bg-primary" />
              The Cinematic Universe
            </div>
            <h1 className="mt-6 font-display text-7xl md:text-[10rem] uppercase tracking-wide leading-[0.85] text-white">
              Movies
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/75 leading-relaxed">
              Journey into the cosmic depths of the mighty Marvel Cinematic Universe.
              {" "}{movies.length} films, spanning {sorted[0]?.release_year}–{sorted[sorted.length - 1]?.release_year}.
            </p>
          </div>
        </section>

        {/* Posters grid */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {sorted.map((m) => (
              <Link
                key={m.id}
                to="/movies/$id"
                params={{ id: String(m.id) }}
                className="group block"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-[var(--ink)] poster-shadow group-hover:translate-y-[-4px] transition-transform duration-300">
                  <div aria-hidden className="absolute inset-0" style={{
                    background: `linear-gradient(160deg, oklch(0.3 0.06 ${(m.id * 37) % 360}) 0%, oklch(0.12 0 0) 100%)`
                  }} />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-[9rem] leading-none text-white/15 group-hover:text-white/25 transition-all duration-500">
                      {String(m.release_year).slice(-2)}
                    </span>
                  </div>
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: "var(--gradient-scrim)" }} />
                  <div className="absolute top-3 left-3 text-[10px] font-sans tracking-[0.3em] uppercase text-white/70">
                    Marvel Studios
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-sans tracking-[0.3em] uppercase bg-primary text-primary-foreground px-2 py-0.5">
                    {m.release_year}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-display text-2xl uppercase tracking-wide leading-tight text-white line-clamp-3">
                      {m.title}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-display text-lg uppercase tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {m.title}
                  </div>
                  <div className="mt-1 text-[11px] font-sans tracking-[0.2em] uppercase text-muted-foreground">
                    {m.release_year} · dir. {m.director}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
