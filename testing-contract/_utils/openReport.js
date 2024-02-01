const { exec } = require('child_process');

const url = `http://localhost:3004/report/newman`
exec(`open -a "Google Chrome" ${url}`)
