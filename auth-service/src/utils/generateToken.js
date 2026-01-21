const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

let privateKey;

try {
  privateKey = fs.readFileSync(path.join('private.key'), 'utf-8');
} catch (error) {
  console.error('Failed to read private key:', error.message);
  process.exit(1);
}

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: process.env.EXPIRATION_TIME
    }
  );
};

module.exports = generateToken;