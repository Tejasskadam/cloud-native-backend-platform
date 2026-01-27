const jwt = require('jsonwebtoken');
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

const { hashToken, createAccessToken, createRefreshToken } = require('../utils/token');
const User = require('../models/user.model');

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const cookidata = jwt.verify(refreshToken, publicKey);

  const user = await User.findById(cookidata.id);
  if (!user) return res.sendStatus(401);

  if (cookidata.tokenVersion !== user.tokenVersion) {
    return res.sendStatus(401);
  }

  if (hashToken(refreshToken) !== user.refreshToken) {
    return res.sendStatus(401);
  }



  // optional rotation
  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  user.refreshToken = hashToken(newRefreshToken);
  await user.save();

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'Strict'
  });

  res.json({ accessToken: newAccessToken });
};

module.exports = { refresh };