const express = require('express');

const { register, login, logout } = require('../controllers/auth.controller');
const protect = require('../middleware/authMiddleware')
const { refresh } = require('../controllers/refresh.controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, (req, res) => {
    res.json({ message: 'Access to protected route granted', user: req.user });
});
router.post('/refresh', refresh);
router.post('/logout', logout);


module.exports = router;