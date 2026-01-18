const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Auth service running on port ${config.port} (${config.env})`);
});
