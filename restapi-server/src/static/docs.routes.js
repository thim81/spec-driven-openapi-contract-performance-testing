import {Router} from "express";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

router.get('/redocly', function (req, res) {
  ;const filePath = path.join(__dirname, '../../public/docs/redocly/index.html');
  res.sendFile(filePath);
});

router.get('/scalar', function (req, res) {
  const filePath = path.join(__dirname, '../../public/docs/scalar/index.html');
  res.sendFile(filePath);
});

router.get('/swagger', function (req, res) {
  const filePath = path.join(__dirname, '../../public/docs/swagger/index.html');
  res.sendFile(filePath);
});

router.get('/stoplight', function (req, res) {
  const filePath = path.join(__dirname, '../../public/docs/stoplight/index.html');
  res.sendFile(filePath);
});

router.get('/openapi', function (req, res) {
  const filePath = path.join(__dirname, '../../../openapi.yml');
  res.sendFile(filePath);
});

router.get('/postman', function (req, res) {
  const filePath = path.join(__dirname, '../../../publish-postman/marvel.postman.json');
  res.sendFile(filePath);
});

export default router;