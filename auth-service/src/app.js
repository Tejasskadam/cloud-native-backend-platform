const express = require('express');

const app = express();

app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const defaultRoute = require('./routes/default.route');
const healthRoutes = require('./routes/health.route');
const authRoutes = require('./routes/auth.route');
app.use('/health', healthRoutes);
app.use('/', defaultRoute);
app.use('/auth', authRoutes);


const errorHandler = require('./middleware/error.middleware');

app.use(errorHandler);

module.exports = app;
