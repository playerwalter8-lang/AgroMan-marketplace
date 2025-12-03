const serverless = require('serverless-http');
const path = require('path');

// Ensure correct working directory for relative requires
process.env.PWD = process.cwd();

// Import the express app
const app = require(path.join(__dirname, '..', 'src', 'app'));

module.exports = serverless(app);
