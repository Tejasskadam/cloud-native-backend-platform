const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user.model');

let publicKey;

try {
  publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'), 'utf-8');
} catch (error) {
  console.error('Failed to read public key:', error.message);
  process.exit(1);
}

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
 
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, publicKey);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ message: 'session expired' });
    } 
    req.user = user;
    next();
  } catch (error) {
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }
  return res.status(401).json({ message: 'Invalid token' });
  }
  
 };
  


module.exports = protect;