import {Router} from "express";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = new Router();

router.get('/newman', function (req, res) {
  const filePath = path.join(__dirname, '../../../testing-contract/report/report.html');
  res.sendFile(filePath);
});

router.get('/k6', function (req, res) {
  const filePath = path.join(__dirname, '../../../testing-k6/report/report.html');
  res.sendFile(filePath);
});
router.get('/k6-graph', function (req, res) {
  const filePath = path.join(__dirname, '../../../testing-k6/report/report-graph.html');
  res.sendFile(filePath);
});

export default router;