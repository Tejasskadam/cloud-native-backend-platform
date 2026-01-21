require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config/index');
const logger = require('./src/config/logger');

logger.info(`Auth service running on port ${config.port}`);
app.listen(config.port, () => {
  console.log(`Auth service running on port ${config.port} (${config.env})`);
});
