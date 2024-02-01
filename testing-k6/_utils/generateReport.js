const reporter = require('k6-html-reporter');

const options = {
    jsonFile: 'summary-report.json',
    output: 'report',
};

// Generate HTML report from K6 JSON report
reporter.generateSummaryReport(options);

