const serverless = require('serverless-http');
const app = require('../backend/server'); // path to your Express app

module.exports.handler = serverless(app);
