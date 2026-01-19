
const app = require('./app');

const config = require('./config/index');
const logger = require('./config/logger');

logger.info(`Auth service running on port ${config.port}`);
app.listen(config.port, () => {
  console.log(`Auth service running on port ${config.port} (${config.env})`);
});
