import {Router} from "express";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

router.get('/', function (req, res) {
  const filePath = path.join(__dirname, '../../public/home/index.html');
  res.sendFile(filePath);
});

router.get('/openapi/marvel.openapi.json', function (req, res) {
  const filePath = path.join(__dirname, '../../../publish-openapi/marvel.openapi.json');
  res.sendFile(filePath);
});

router.get('/openapi/marvel.openapi.yaml', function (req, res) {
  const filePath = path.join(__dirname, '../../../publish-openapi/marvel.openapi.yaml');
  res.sendFile(filePath);
});

router.get('/postman/marvel.postman.json', function (req, res) {
  const filePath = path.join(__dirname, '../../../publish-postman/marvel.postman.json');
  res.sendFile(filePath);
});


export default router;