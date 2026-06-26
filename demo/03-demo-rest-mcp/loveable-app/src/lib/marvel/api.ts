import { queryOptions } from "@tanstack/react-query";

export type Hero = {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  description: string | null;
  powers: string[];
};

export type Movie = {
  id: number;
  title: string;
  release_year: number;
  director: string;
  description: string | null;
};

export type Appearance = {
  id: number;
  hero_id: number;
  movie_id: number;
  role: "lead" | "supporting" | "cameo";
};

type Pagination = {
  total: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  per_page: number;
  total_pages: number;
};

type CollectionEnvelope<T> = {
  pagination?: {
    pagination?: Pagination;
  };
} & Record<string, T[] | unknown>;

class MarvelApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "MarvelApiError";
    this.status = status;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "https://marvel-api.in-spectr.dev/api";
const DEFAULT_LIMIT = 100;

function buildApiUrl(path: string) {
  if (!API_BASE_URL) return path;
  const base = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;
  return new URL(path.replace(/^\/+/, ""), `${base}/`).toString();
}

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = response.statusText || "Request failed";
    try {
      const body = await response.json();
      if (body && typeof body.error === "string") {
        message = body.error;
      }
    } catch {
      // Use the HTTP status text when the body is not JSON.
    }
    throw new MarvelApiError(response.status, message);
  }

  return response.json() as Promise<T>;
}

function unwrapCollection<T>(envelope: CollectionEnvelope<T>, key: string): T[] {
  const items = envelope[key];
  return Array.isArray(items) ? (items as T[]) : [];
}

async function fetchAllCollection<T>(path: string, key: string): Promise<T[]> {
  const firstPage = await requestJson<CollectionEnvelope<T>>(`${path}?page=1&limit=${DEFAULT_LIMIT}`);
  const items = unwrapCollection(firstPage, key);
  const totalPages = firstPage.pagination?.pagination?.total_pages ?? 1;

  if (totalPages <= 1) {
    return items;
  }

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, async (_, index) => {
      const page = index + 2;
      const envelope = await requestJson<CollectionEnvelope<T>>(
        `${path}?page=${page}&limit=${DEFAULT_LIMIT}`,
      );
      return unwrapCollection(envelope, key);
    }),
  );

  return [items, ...rest].flat();
}

async function fetchResource<T>(path: string): Promise<T> {
  return requestJson<T>(path);
}

export function isMarvelApiNotFoundError(error: unknown): error is MarvelApiError {
  return error instanceof MarvelApiError && error.status === 404;
}

export async function fetchHeroes(): Promise<Hero[]> {
  return fetchAllCollection<Hero>("/heroes", "heroes");
}

export async function fetchHero(id: number): Promise<Hero> {
  return fetchResource<Hero>(`/heroes/${id}`);
}

export async function fetchHeroAppearances(heroId: number): Promise<Appearance[]> {
  return fetchAllCollection<Appearance>(`/heroes/${heroId}/appearances`, "appearances");
}

export async function fetchMovies(): Promise<Movie[]> {
  return fetchAllCollection<Movie>("/movies", "movies");
}

export async function fetchMovie(id: number): Promise<Movie> {
  return fetchResource<Movie>(`/movies/${id}`);
}

export async function fetchMovieAppearances(movieId: number): Promise<Appearance[]> {
  const appearances = await fetchAllCollection<Appearance>("/appearances", "appearances");
  return appearances.filter((appearance) => appearance.movie_id === movieId);
}

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
