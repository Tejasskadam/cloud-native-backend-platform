const express = require('express');

const app = express();

app.use(express.json());

const healthRoutes = require('./routes/health.route');
app.use(healthRoutes);

const errorHandler = require('./middleware/error.middleware');

app.use(errorHandler);

module.exports = app;
