const express = require('express');

const { register, login, logout } = require('../controllers/auth.controller');
const protect = require('../middleware/authMiddleware')
const { refresh } = require('../controllers/refresh.controller');
const authorize = require('../middleware/authorize');
const { getProfile, getUserById } = require('../controllers/user.controller');
const authorizeOwnership = require('../middleware/authorizeOwnership');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, authorize('read_own_profile'), getProfile );
router.get('/user/:id', protect , authorizeOwnership({
ownPermission : 'read_own_profile', 
anyPermission : 'read_any_profile', 
getResourceOwnerId: (req) => req.params.id
}),
 getUserById);
router.post('/refresh', refresh);
router.post('/logout', logout);


module.exports = router;