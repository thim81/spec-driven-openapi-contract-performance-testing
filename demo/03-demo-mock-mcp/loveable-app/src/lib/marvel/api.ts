import { queryOptions } from "@tanstack/react-query";
import {
  HEROES,
  MOVIES,
  getHeroById,
  getMovieById,
  getAppearancesForHero,
  getAppearancesForMovie,
  type Hero,
  type Movie,
  type Appearance,
} from "./data";

/**
 * Marvel Universe API client.
 *
 * Per the OpenAPI spec the live mock lives at:
 *   https://marvel-api-mock.in-spectr.dev
 * At time of build it returned 404 on every documented path, so we ship with a
 * baked-in dataset modeled exactly on the spec's schemas. If the upstream API
 * comes back online, swap `USE_LOCAL` to false (or wire it to an env flag).
 */
const USE_LOCAL = true;
// const API_BASE = "https://marvel-api-mock.in-spectr.dev";

async function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((r) => setTimeout(() => r(value), ms));
}

export async function fetchHeroes(): Promise<Hero[]> {
  if (USE_LOCAL) return delay(HEROES);
  // const res = await fetch(`${API_BASE}/heroes?limit=100`);
  // const data = await res.json();
  // return data.heroes as Hero[];
  return HEROES;
}

export async function fetchHero(id: number): Promise<Hero> {
  if (USE_LOCAL) {
    const h = getHeroById(id);
    if (!h) throw new Error("Hero not found");
    return delay(h);
  }
  return HEROES[0];
}

export async function fetchHeroAppearances(heroId: number): Promise<Appearance[]> {
  if (USE_LOCAL) return delay(getAppearancesForHero(heroId));
  return [];
}

export async function fetchMovies(): Promise<Movie[]> {
  if (USE_LOCAL) return delay(MOVIES);
  return MOVIES;
}

export async function fetchMovie(id: number): Promise<Movie> {
  if (USE_LOCAL) {
    const m = getMovieById(id);
    if (!m) throw new Error("Movie not found");
    return delay(m);
  }
  return MOVIES[0];
}

export async function fetchMovieAppearances(movieId: number): Promise<Appearance[]> {
  if (USE_LOCAL) return delay(getAppearancesForMovie(movieId));
  return [];
}

// ── Query options ───────────────────────────────────────────────────────────

export const heroesQuery = () =>
  queryOptions({ queryKey: ["heroes"], queryFn: fetchHeroes });

export const heroQuery = (id: number) =>
  queryOptions({ queryKey: ["hero", id], queryFn: () => fetchHero(id) });

export const heroAppearancesQuery = (id: number) =>
  queryOptions({
    queryKey: ["hero-appearances", id],
    queryFn: () => fetchHeroAppearances(id),
  });

export const moviesQuery = () =>
  queryOptions({ queryKey: ["movies"], queryFn: fetchMovies });

export const movieQuery = (id: number) =>
  queryOptions({ queryKey: ["movie", id], queryFn: () => fetchMovie(id) });

export const movieAppearancesQuery = (id: number) =>
  queryOptions({
    queryKey: ["movie-appearances", id],
    queryFn: () => fetchMovieAppearances(id),
  });
