import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createApp } from './app.mjs';
import { createDatabase } from './database.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const databasePath = process.env.SQLITE_PATH ?? resolve(projectRoot, 'data/marvel.db');
const host = process.env.HOST ?? '127.0.0.1';
const port = Number.parseInt(process.env.PORT ?? '3077', 10);

const database = createDatabase(databasePath);
const server = createApp(database).listen(port, host, () => {
  console.log(`Marvel API listening on http://${host}:${port}`);
  console.log(`SQLite database: ${databasePath}`);
});

function shutdown() {
  server.close(() => {
    database.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
