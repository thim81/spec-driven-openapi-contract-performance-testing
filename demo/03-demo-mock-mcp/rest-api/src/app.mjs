import express from 'express';

const ROLE_VALUES = new Set(['lead', 'supporting', 'cameo']);

class ApiError extends Error {
  constructor(status, body) {
    super(body.error);
    this.status = status;
    this.body = body;
  }
}

export function createApp(db) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.get('/', (_request, response) => {
    response.json({ api: 'Marvel Universe API', version: '1.1.0' });
  });

  app.get('/heroes', (request, response) => {
    const total = countRows(db, 'heroes');
    const page = getPage(request, total);
    const rows = db.prepare(`
      SELECT id, name, first_name, last_name, description, powers
      FROM heroes
      ORDER BY id
      LIMIT ? OFFSET ?
    `).all(page.limit, page.offset);

    response.json({
      heroes: rows.map(serializeHero),
      pagination: { pagination: page.pagination }
    });
  });

  app.post('/heroes', (request, response) => {
    const hero = validateHero(request.body);
    const result = db.prepare(`
      INSERT INTO heroes (name, first_name, last_name, description, powers)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      hero.name,
      hero.first_name,
      hero.last_name,
      hero.description,
      JSON.stringify(hero.powers)
    );

    response.status(201).json(findHero(db, Number(result.lastInsertRowid)));
  });

  app.get('/heroes/:heroId', (request, response) => {
    response.json(requireHero(db, request.params.heroId));
  });

  app.put('/heroes/:heroId', (request, response) => {
    const heroId = requirePositiveInteger(request.params.heroId, 'heroId');
    requireHero(db, heroId);
    const hero = validateHero(request.body);

    db.prepare(`
      UPDATE heroes
      SET name = ?, first_name = ?, last_name = ?, description = ?, powers = ?
      WHERE id = ?
    `).run(
      hero.name,
      hero.first_name,
      hero.last_name,
      hero.description,
      JSON.stringify(hero.powers),
      heroId
    );

    response.json(findHero(db, heroId));
  });

  app.delete('/heroes/:heroId', (request, response) => {
    const heroId = requirePositiveInteger(request.params.heroId, 'heroId');
    const result = db.prepare('DELETE FROM heroes WHERE id = ?').run(heroId);
    if (result.changes === 0) {
      throw new ApiError(404, { error: 'Marvel hero not found' });
    }
    response.status(204).send();
  });

  app.get('/movies', (request, response) => {
    const total = countRows(db, 'movies');
    const page = getPage(request, total);
    const movies = db.prepare(`
      SELECT id, title, release_year, director, description
      FROM movies
      ORDER BY id
      LIMIT ? OFFSET ?
    `).all(page.limit, page.offset).map(serializeMovie);

    response.json({
      movies,
      pagination: { pagination: page.pagination }
    });
  });

  app.post('/movies', (request, response) => {
    const movie = validateMovie(request.body);
    const result = db.prepare(`
      INSERT INTO movies (title, release_year, director, description)
      VALUES (?, ?, ?, ?)
    `).run(movie.title, movie.release_year, movie.director, movie.description);

    response.status(201).json(findMovie(db, Number(result.lastInsertRowid)));
  });

  app.get('/movies/:movieId', (request, response) => {
    response.json(requireMovie(db, request.params.movieId));
  });

  app.get('/appearances', (request, response) => {
    const total = countRows(db, 'appearances');
    const page = getPage(request, total);
    const appearances = db.prepare(`
      SELECT id, hero_id, movie_id, role
      FROM appearances
      ORDER BY id
      LIMIT ? OFFSET ?
    `).all(page.limit, page.offset).map(serializeAppearance);

    response.json({
      appearances,
      pagination: { pagination: page.pagination }
    });
  });

  app.post('/appearances', (request, response) => {
    const appearance = validateAppearance(request.body);
    requireHero(db, appearance.hero_id, 'hero_id');
    requireMovie(db, appearance.movie_id, 'movie_id');

    const duplicate = db.prepare(`
      SELECT id FROM appearances WHERE hero_id = ? AND movie_id = ?
    `).get(appearance.hero_id, appearance.movie_id);
    if (duplicate) {
      throw validationError('movie_id', 'This hero already has an appearance in this movie.');
    }

    const result = db.prepare(`
      INSERT INTO appearances (hero_id, movie_id, role)
      VALUES (?, ?, ?)
    `).run(appearance.hero_id, appearance.movie_id, appearance.role);

    response.status(201).json(findAppearance(db, Number(result.lastInsertRowid)));
  });

  app.get('/appearances/:appearanceId', (request, response) => {
    response.json(requireAppearance(db, request.params.appearanceId));
  });

  app.get('/heroes/:heroId/appearances', (request, response) => {
    const heroId = requirePositiveInteger(request.params.heroId, 'heroId');
    requireHero(db, heroId);
    const total = db.prepare(`
      SELECT COUNT(*) AS count FROM appearances WHERE hero_id = ?
    `).get(heroId).count;
    const page = getPage(request, total);
    const appearances = db.prepare(`
      SELECT id, hero_id, movie_id, role
      FROM appearances
      WHERE hero_id = ?
      ORDER BY id
      LIMIT ? OFFSET ?
    `).all(heroId, page.limit, page.offset).map(serializeAppearance);

    response.json({
      appearances,
      pagination: { pagination: page.pagination }
    });
  });

  app.use((_request, response) => {
    response.status(404).json({ error: 'Resource not found' });
  });

  app.use((error, _request, response, _next) => {
    if (error instanceof ApiError) {
      response.status(error.status).json(error.body);
      return;
    }
    if (error instanceof SyntaxError && error.status === 400) {
      response.status(400).json({ error: 'Invalid JSON request body' });
      return;
    }
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}

function countRows(db, table) {
  return db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count;
}

function getPage(request, total) {
  const page = parseQueryInteger(request.query.page ?? '1', 'Page');
  const limit = parseQueryInteger(request.query.limit ?? '10', 'Limit');

  if (limit > 100) {
    throw new ApiError(400, { error: 'Limit cannot be greater than 100' });
  }

  const totalPages = Math.ceil(total / limit);
  if (totalPages > 0 && page > totalPages) {
    throw new ApiError(400, {
      error: `Page number cannot be greater than ${totalPages}`
    });
  }

  return {
    limit,
    offset: (page - 1) * limit,
    pagination: {
      total,
      current_page: page,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
      per_page: limit,
      total_pages: totalPages
    }
  };
}

function parseQueryInteger(value, label) {
  if (!/^\d+$/.test(String(value)) || Number(value) < 1) {
    throw new ApiError(400, { error: `${label} must be a positive integer` });
  }
  return Number(value);
}

function requirePositiveInteger(value, field) {
  if (!/^\d+$/.test(String(value)) || Number(value) < 1) {
    throw new ApiError(404, { error: `${field} not found` });
  }
  return Number(value);
}

function validateHero(payload) {
  assertObject(payload);
  assertKnownFields(payload, ['name', 'first_name', 'last_name', 'description', 'powers']);
  const details = [];
  validateRequiredString(payload.name, 'name', details);
  validateOptionalString(payload.first_name, 'first_name', details);
  validateOptionalString(payload.last_name, 'last_name', details);
  validateOptionalString(payload.description, 'description', details, true);
  if (payload.powers !== undefined &&
      (!Array.isArray(payload.powers) || payload.powers.some((power) => typeof power !== 'string'))) {
    details.push({ field: 'powers', message: "Field 'powers' must be an array of strings." });
  }
  throwIfValidationErrors(details);
  return {
    name: payload.name,
    first_name: payload.first_name ?? null,
    last_name: payload.last_name ?? null,
    description: payload.description ?? null,
    powers: payload.powers ?? []
  };
}

function validateMovie(payload) {
  assertObject(payload);
  assertKnownFields(payload, ['title', 'release_year', 'director', 'description']);
  const details = [];
  validateRequiredString(payload.title, 'title', details);
  if (!Number.isInteger(payload.release_year)) {
    details.push({ field: 'release_year', message: "Field 'release_year' must be an integer." });
  }
  validateOptionalString(payload.director, 'director', details);
  validateOptionalString(payload.description, 'description', details, true);
  throwIfValidationErrors(details);
  return {
    title: payload.title,
    release_year: payload.release_year,
    director: payload.director ?? null,
    description: payload.description ?? null
  };
}

function validateAppearance(payload) {
  assertObject(payload);
  assertKnownFields(payload, ['hero_id', 'movie_id', 'role']);
  const details = [];
  if (!Number.isInteger(payload.hero_id) || payload.hero_id < 1) {
    details.push({ field: 'hero_id', message: "Field 'hero_id' must be a positive integer." });
  }
  if (!Number.isInteger(payload.movie_id) || payload.movie_id < 1) {
    details.push({ field: 'movie_id', message: "Field 'movie_id' must be a positive integer." });
  }
  if (!ROLE_VALUES.has(payload.role)) {
    details.push({ field: 'role', message: "Field 'role' must be lead, supporting, or cameo." });
  }
  throwIfValidationErrors(details);
  return payload;
}

function assertObject(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw validationError('body', 'Request body must be a JSON object.');
  }
}

function assertKnownFields(payload, allowedFields) {
  const unknown = Object.keys(payload).filter((field) => !allowedFields.includes(field));
  if (unknown.length > 0) {
    throw new ApiError(422, {
      error: 'Validation errors',
      details: unknown.map((field) => ({
        field,
        message: `Field '${field}' is not allowed.`
      }))
    });
  }
}

function validateRequiredString(value, field, details) {
  if (typeof value !== 'string' || value.trim() === '') {
    details.push({ field, message: `Field '${field}' must be a non-empty string.` });
  }
}

function validateOptionalString(value, field, details, nullable = false) {
  if (value === undefined || (nullable && value === null)) return;
  if (typeof value !== 'string') {
    details.push({ field, message: `Field '${field}' must be a string.` });
  }
}

function throwIfValidationErrors(details) {
  if (details.length > 0) {
    throw new ApiError(422, { error: 'Validation errors', details });
  }
}

function validationError(field, message) {
  return new ApiError(422, {
    error: 'Validation errors',
    details: [{ field, message }]
  });
}

function findHero(db, id) {
  const row = db.prepare(`
    SELECT id, name, first_name, last_name, description, powers
    FROM heroes WHERE id = ?
  `).get(id);
  return row ? serializeHero(row) : undefined;
}

function requireHero(db, value, field = 'heroId') {
  const id = requirePositiveInteger(value, field);
  const hero = findHero(db, id);
  if (!hero) throw new ApiError(404, { error: 'Marvel hero not found' });
  return hero;
}

function findMovie(db, id) {
  const row = db.prepare(`
    SELECT id, title, release_year, director, description
    FROM movies WHERE id = ?
  `).get(id);
  return row ? serializeMovie(row) : undefined;
}

function requireMovie(db, value, field = 'movieId') {
  const id = requirePositiveInteger(value, field);
  const movie = findMovie(db, id);
  if (!movie) throw new ApiError(404, { error: 'Marvel movie not found' });
  return movie;
}

function findAppearance(db, id) {
  const row = db.prepare(`
    SELECT id, hero_id, movie_id, role
    FROM appearances WHERE id = ?
  `).get(id);
  return row ? serializeAppearance(row) : undefined;
}

function requireAppearance(db, value) {
  const id = requirePositiveInteger(value, 'appearanceId');
  const appearance = findAppearance(db, id);
  if (!appearance) {
    throw new ApiError(404, { error: 'Marvel appearance not found' });
  }
  return appearance;
}

function serializeHero(row) {
  const hero = {
    id: Number(row.id),
    name: row.name,
    description: row.description,
    powers: JSON.parse(row.powers)
  };
  if (row.first_name !== null) hero.first_name = row.first_name;
  if (row.last_name !== null) hero.last_name = row.last_name;
  return hero;
}

function serializeMovie(row) {
  const movie = {
    id: Number(row.id),
    title: row.title,
    release_year: Number(row.release_year),
    description: row.description
  };
  if (row.director !== null) movie.director = row.director;
  return movie;
}

function serializeAppearance(row) {
  return {
    id: Number(row.id),
    hero_id: Number(row.hero_id),
    movie_id: Number(row.movie_id),
    role: row.role
  };
}
