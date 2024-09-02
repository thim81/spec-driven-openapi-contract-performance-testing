const { exec } = require('child_process');

const url = `http://localhost:3004/report/k6`
exec(`open -a "Google Chrome" ${url}`)

const url_graph = `http://localhost:3004/report/k6-graph`
exec(`open -a "Google Chrome" ${url_graph}`)
