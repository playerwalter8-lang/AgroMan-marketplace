// This file starts the server for local development.
// The Express `app` is defined in `src/app.js` so it can be imported by serverless wrappers.
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ AgroMan API running on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
