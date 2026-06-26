import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

import { appearances, heroes, movies } from './seed-data.mjs';

export function createDatabase(filename) {
  if (filename !== ':memory:') {
    mkdirSync(dirname(filename), { recursive: true });
  }

  const db = new DatabaseSync(filename);
  db.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      first_name TEXT,
      last_name TEXT,
      description TEXT,
      powers TEXT NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      release_year INTEGER NOT NULL,
      director TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS appearances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hero_id INTEGER NOT NULL,
      movie_id INTEGER NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('lead', 'supporting', 'cameo')),
      FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      UNIQUE (hero_id, movie_id)
    );

    CREATE INDEX IF NOT EXISTS appearances_hero_id_idx ON appearances(hero_id);
    CREATE INDEX IF NOT EXISTS appearances_movie_id_idx ON appearances(movie_id);
  `);

  seedDatabase(db);
  return db;
}

function seedDatabase(db) {
  const heroCount = db.prepare('SELECT COUNT(*) AS count FROM heroes').get().count;
  const movieCount = db.prepare('SELECT COUNT(*) AS count FROM movies').get().count;
  const appearanceCount = db.prepare('SELECT COUNT(*) AS count FROM appearances').get().count;

  db.exec('BEGIN');
  try {
    if (heroCount === 0) {
      const insertHero = db.prepare(`
        INSERT INTO heroes (id, name, first_name, last_name, description, powers)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      for (const hero of heroes) {
        insertHero.run(
          hero.id,
          hero.name,
          hero.first_name,
          hero.last_name,
          hero.description,
          JSON.stringify(hero.powers)
        );
      }
    }

    if (movieCount === 0) {
      const insertMovie = db.prepare(`
        INSERT INTO movies (id, title, release_year, director, description)
        VALUES (?, ?, ?, ?, ?)
      `);
      for (const movie of movies) {
        insertMovie.run(
          movie.id,
          movie.title,
          movie.release_year,
          movie.director,
          movie.description
        );
      }
    }

    if (appearanceCount === 0) {
      const insertAppearance = db.prepare(`
        INSERT INTO appearances (id, hero_id, movie_id, role)
        VALUES (?, ?, ?, ?)
      `);
      for (const appearance of appearances) {
        insertAppearance.run(
          appearance.id,
          appearance.hero_id,
          appearance.movie_id,
          appearance.role
        );
      }
    }

    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
