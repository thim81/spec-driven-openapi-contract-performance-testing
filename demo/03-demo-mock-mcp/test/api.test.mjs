import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test, { after, before } from 'node:test';

import { createApp } from '../src/app.mjs';
import { createDatabase } from '../src/database.mjs';

let baseUrl;
let database;
let server;

before(async () => {
  database = createDatabase(':memory:');
  server = createApp(database).listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  database.close();
});

test('returns API information', async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    api: 'Marvel Universe API',
    version: '1.0.0'
  });
});

test('paginates heroes with schema-compatible metadata', async () => {
  const firstResponse = await fetch(`${baseUrl}/heroes?page=1&limit=1`);
  const first = await firstResponse.json();
  assert.equal(firstResponse.status, 200);
  assert.equal(first.heroes[0].name, 'Iron Man');
  assert.deepEqual(first.pagination.pagination, {
    total: 2,
    current_page: 1,
    next_page: 2,
    prev_page: null,
    per_page: 1,
    total_pages: 2
  });

  const second = await (await fetch(`${baseUrl}/heroes?page=2&limit=1`)).json();
  assert.equal(second.heroes[0].name, 'Spider-Man');
  assert.equal(second.pagination.pagination.prev_page, 1);
});

test('returns all seeded movies across pages', async () => {
  const response = await fetch(`${baseUrl}/movies?page=3&limit=5`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.pagination.pagination.total, 15);
  assert.equal(body.pagination.pagination.total_pages, 3);
  assert.deepEqual(
    body.movies.map((movie) => movie.title),
    [
      'Spider-Man: Homecoming',
      'Spider-Man: Far From Home',
      'Spider-Man: No Way Home',
      'Avengers: Infinity War',
      'Avengers: Endgame'
    ]
  );
});

test('returns canonical appearances for a hero', async () => {
  const response = await fetch(`${baseUrl}/heroes/1/appearances`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body.appearances.map(({ id }) => id), [1, 3, 4, 5, 7]);
  assert.equal(body.pagination.pagination.total, 5);
});

test('creates, updates, and deletes a hero', async () => {
  const createResponse = await fetch(`${baseUrl}/heroes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Black Widow',
      first_name: 'Natasha',
      last_name: 'Romanoff',
      powers: ['Espionage', 'Martial arts']
    })
  });
  const created = await createResponse.json();
  assert.equal(createResponse.status, 201);
  assert.equal(created.id, 3);

  const updateResponse = await fetch(`${baseUrl}/heroes/3`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Black Widow',
      description: 'Expert spy and Avenger.',
      powers: ['Espionage', 'Martial arts']
    })
  });
  assert.equal(updateResponse.status, 200);
  assert.equal((await updateResponse.json()).description, 'Expert spy and Avenger.');

  assert.equal((await fetch(`${baseUrl}/heroes/3`, { method: 'DELETE' })).status, 204);
  assert.equal((await fetch(`${baseUrl}/heroes/3`)).status, 404);
});

test('creates a movie and a related appearance', async () => {
  const movieResponse = await fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'The Amazing Spider-Man',
      release_year: 2012,
      director: 'Marc Webb'
    })
  });
  const movie = await movieResponse.json();
  assert.equal(movieResponse.status, 201);
  assert.equal(movie.id, 16);

  const appearanceResponse = await fetch(`${baseUrl}/appearances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hero_id: 2, movie_id: movie.id, role: 'lead' })
  });
  const appearance = await appearanceResponse.json();
  assert.equal(appearanceResponse.status, 201);
  assert.equal(appearance.id, 9);
  assert.deepEqual(
    await (await fetch(`${baseUrl}/appearances/9`)).json(),
    appearance
  );
});

test('rejects invalid pagination and request fields', async () => {
  assert.equal((await fetch(`${baseUrl}/movies?page=99`)).status, 400);

  const response = await fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Invalid', release_year: 'soon', extra: true })
  });
  assert.equal(response.status, 422);
  assert.equal((await response.json()).error, 'Validation errors');
});

test('persists data in a file-backed SQLite database', () => {
  const directory = mkdtempSync(join(tmpdir(), 'marvel-api-'));
  const filename = join(directory, 'marvel.db');
  const first = createDatabase(filename);
  first.prepare(`
    INSERT INTO movies (title, release_year) VALUES (?, ?)
  `).run('Persistent Movie', 2026);
  first.close();

  const reopened = createDatabase(filename);
  const row = reopened.prepare(`
    SELECT title FROM movies WHERE title = ?
  `).get('Persistent Movie');
  reopened.close();
  assert.equal(row.title, 'Persistent Movie');
});
