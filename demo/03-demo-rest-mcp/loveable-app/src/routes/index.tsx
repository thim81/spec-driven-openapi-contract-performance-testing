import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { heroesQuery, moviesQuery } from "@/lib/marvel/api";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { HeroCard } from "@/components/hero-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marvel Universe — Hero Archives" },
      {
        name: "description",
        content:
          "Journey into the cosmic depths of the mighty Marvel Universe — characters, powers, and the films that shaped a saga.",
      },
      { property: "og:title", content: "Marvel Universe — Hero Archives" },
      {
        property: "og:description",
        content: "Browse the heroes of the Marvel Universe.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(heroesQuery());
    context.queryClient.ensureQueryData(moviesQuery());
  },
  component: HomePage,
  pendingComponent: HomePending,
});

function HomePending() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <div className="flex-1 grid place-items-center">
        <div className="font-display text-2xl tracking-[0.3em] uppercase text-muted-foreground animate-pulse">
          Loading archives…
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<HomePending />}>
          <HomeContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionHeading({ kicker, title, action }: { kicker: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
      <div>
        <div className="flex items-center gap-3 text-[11px] font-sans tracking-[0.3em] uppercase text-primary">
          <span className="inline-block h-2 w-2 bg-primary" />
          {kicker}
        </div>
        <h2 className="mt-3 font-display text-5xl md:text-7xl uppercase tracking-wide text-foreground">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function HomeContent() {
  const { data: heroes } = useSuspenseQuery(heroesQuery());
  const { data: movies } = useSuspenseQuery(moviesQuery());
  const featured = heroes[0];
  const upcoming = [...movies].sort((a, b) => b.release_year - a.release_year).slice(0, 6);

  return (
    <>
      <HeroSpotlight hero={featured} />

      {/* Characters grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          kicker="The Archive"
          title="Characters"
          action={
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {heroes.length} characters indexed. Tap a poster to dive into powers, identity, and on-screen history.
            </p>
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {heroes.map((h, i) => (
            <HeroCard key={h.id} hero={h} index={i} />
          ))}
        </div>
      </section>

      {/* Red banner — call to movies */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-sans tracking-[0.3em] uppercase text-white/80">In Theaters & Beyond</div>
            <h3 className="mt-2 font-display text-4xl md:text-6xl uppercase tracking-wide leading-none">
              The Saga Continues
            </h3>
          </div>
          <Link
            to="/movies"
            className="inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--ink-foreground)] px-7 py-3.5 font-display text-base tracking-[0.2em] uppercase hover:bg-black transition"
          >
            Browse All Movies →
          </Link>
        </div>
      </section>

      {/* Movies preview */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading kicker="Cinematic Universe" title="Latest Films" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-8">
          {upcoming.map((m) => (
            <Link
              key={m.id}
              to="/movies/$id"
              params={{ id: String(m.id) }}
              className="group block"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-[var(--ink)] poster-shadow group-hover:translate-y-[-4px] transition-transform duration-300">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[8rem] leading-none text-white/15">
                    {String(m.release_year).slice(-2)}
                  </span>
                </div>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: "var(--gradient-scrim)" }} />
                <div className="absolute top-3 left-3 text-[10px] font-sans tracking-[0.3em] uppercase text-white/70">
                  Marvel Studios
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="font-display text-lg uppercase tracking-wide leading-tight text-white line-clamp-2">
                    {m.title}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-display text-base uppercase tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {m.title}
                </div>
                <div className="mt-1 text-[11px] font-sans tracking-[0.2em] uppercase text-muted-foreground">
                  {m.release_year}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
