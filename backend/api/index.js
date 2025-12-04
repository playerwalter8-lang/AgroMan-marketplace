const app = require('./src/app');

const handler = (req, res) => {
  return app(req, res);
};

module.exports = handler;
