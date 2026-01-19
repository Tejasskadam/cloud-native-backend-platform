const express = require('express');
const router = express.Router();
const { defaultRoute } = require('../controllers/default.controller');
router.get('/', defaultRoute);
module.exports = router;
