import express from "express";

import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';


import charactersRoutes from "./routes/characters.routes.js";
import teamsRoutes from "./routes/teams.routes.js";
import moviesRoutes from "./routes/movies.routes.js";

const port = 3004
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'Stark Industries')
  next()
})

// Log request details middleware
app.use((req, res, next) => {
  // Store the start time of the request
  const startTime = Date.now();
  res.on('finish', () => {
    // Calculate the duration of the request
    const duration = Date.now() - startTime;
    // Log the request method, path, response code, and duration
    if (res.statusCode < 200 || res.statusCode >= 300) {
      // Include error information in the log for non-2xx responses
      console.error(`${req.method} ${req.path} - ${res.statusCode} - Error (${duration}ms)`);
    } else {
      // Log successful requests without error details
      console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    }
  });
  // Continue to the next middleware
  next();
});

// ----- STATIC FILES

// Trigger Docs routes
app.get('/docs/redocly', function (req, res) {
  const filePath = path.join(__dirname, '../docs/redocly/index.html');
  res.sendFile(filePath);
});
app.get('/docs/scalar', function (req, res) {
  const filePath = path.join(__dirname, '../docs/scalar/index.html');
  res.sendFile(filePath);
});
app.get('/docs/swagger', function (req, res) {
  const filePath = path.join(__dirname, '../docs/swagger/index.html');
  res.sendFile(filePath);
});
app.get('/docs/openapi/marvel.openapi.json', function (req, res) {
  const filePath = path.join(__dirname, '../../publish-openapi/marvel.openapi.json');
  res.sendFile(filePath);
});
app.get('/docs/openapi/marvel.openapi.yaml', function (req, res) {
  const filePath = path.join(__dirname, '../../publish-openapi/marvel.openapi.yaml');
  res.sendFile(filePath);
});
app.get('/docs/openapi', function (req, res) {
  const filePath = path.join(__dirname, '../../openapi.yml');
  res.sendFile(filePath);
});
app.get('/docs/openapi', function (req, res) {
  const filePath = path.join(__dirname, '../../openapi.yml');
  res.sendFile(filePath);
});
app.get('/report/newman', function (req, res) {
  const filePath = path.join(__dirname, '../../testing-contract/report/report.html');
  res.sendFile(filePath);
});
app.get('/report/k6', function (req, res) {
  const filePath = path.join(__dirname, '../../testing-k6/report/report.html');
  res.sendFile(filePath);
});

// ----- REST API

app.get('/api/health', (req, res) => {
  res.status(200).send('ok')
})

// Check authentication Bearer token
app.use('/api', (req, res, next) => {
  if (req?.headers?.authorization && req.headers.authorization.length > 0) {
    next()
  } else {
    res.status(401).send({error: 'unauthorized'})
  }
})

// Trigger API routes
app.use("/api", charactersRoutes);
app.use("/api", teamsRoutes);
app.use("/api", moviesRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
