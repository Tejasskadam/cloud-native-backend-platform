const jwt = require('jsonwebtoken');
const { createAccessToken } = require('../utils/token');
const fs = require('fs');
const path = require('path');

let publicKey;

try {
  publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'), 'utf-8');
} catch (error) {
  console.error('Failed to read public key:', error.message);
  process.exit(1);
}
try {
    privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'), 'utf-8');
} catch (error) {
    console.error('Failed to read private key:', error.message);
    process.exit(1);
}

const refresh = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies.refreshToken;
    console.log('Cookies:', req.cookies);
console.log('Refresh Token:', refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' });
    }

    const payload = jwt.verify(
      refreshToken,
      publicKey
    );

    const user = {
      id: payload.id,
      role: payload.role || 'USER'
    };

    const newAccessToken = createAccessToken(user);

    res.json({ accessToken: newAccessToken });
    next();

} catch (err) {
  console.log('VERIFY ERROR NAME:', err.name);
  console.log('VERIFY ERROR MESSAGE:', err.message);
  return res.status(403).json({ message: 'Invalid refresh token' });
}
};

module.exports = { refresh };